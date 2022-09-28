import _ from 'lodash';
import { Invocation } from './types';
/**
 * Parses a dereferenced OpenAPI schema provided by SwaggerParser into
 * an object that the UI builder can understand.
 *
 * TODO: This is a rather unapproachable bunch of _.reduce() calls,
 * refactor into something that humans can wrap their heads around.
 *
 * TODO: I cannot figure out the types. It looks like `schema` should be
 * an OpenAPI.Document but that doesn't work.
 */
const parseSchema = (schema: any): Record<string, Invocation> => {
  // Reduce the component schemas into invocations
  return _.reduce(
    schema.components.schemas,
    (schemas: Record<string, any>, schema, id) => {
      // Right now we just have to match invocations by name pending changes to backend
      if (id.match(/Invocation$/)) {
        schemas[id] = {
          moduleType: schema.properties.type.enum[0],
          moduleLabel: schema?.properties?.ui?.default?.label || id,
          fields: _.reduce(
            schema.properties,
            (fields: Record<string, any>, property, id) => {
              if (!['id', 'type', 'ui'].includes(id)) {
                if (property?.ui?.in_settings_panel) {
                  return fields;
                }
                const { title, ui } = property;
                let t: string = property.type;
                let ui_type = ui?.type;
                let additional: Record<string, any> = {};

                if (!ui_type) {
                  if ('enum' in property) {
                    ui_type = 'select';
                  } else if (
                    'allOf' in property &&
                    property.allOf[0].title === 'ImageField'
                  ) {
                    ui_type = 'image';
                    t = 'image';
                  } else if (t === 'string') {
                    ui_type = 'text';
                  } else if (['integer', 'number'].includes(t)) {
                    ui_type = 'slider';
                  } else if (t === 'boolean') {
                    ui_type = 'toggle';
                  }
                }

                switch (ui_type) {
                  case 'text': {
                    break;
                  }
                  case 'textarea': {
                    break;
                  }
                  case 'number_input':
                  case 'slider': {
                    const {
                      minimum,
                      maximum,
                      multipleOf,
                      exclusiveMinimum,
                      exclusiveMaximum,
                    } = property;

                    if (exclusiveMinimum !== undefined) {
                      additional.exclusive_minimum = exclusiveMinimum;
                    } else if (minimum !== undefined) {
                      additional.minimum = minimum;
                    }

                    if (exclusiveMaximum !== undefined) {
                      additional.exclusive_maximum = exclusiveMaximum;
                    } else if (maximum !== undefined) {
                      additional.maximum = maximum;
                    }

                    if (multipleOf) {
                      additional.multiple_of = multipleOf;
                    } else {
                      if (t === 'number') {
                        additional.multiple_of = 0.01;
                      } else {
                        additional.multiple_of = 1;
                      }
                    }

                    break;
                  }
                  case 'select': {
                    additional = { options: property.enum };
                    break;
                  }
                  case 'image': {
                    break;
                  }
                  case 'toggle': {
                    break;
                  }
                }

                fields[id] = {
                  value: property.default,
                  label: ui?.label || title,
                  type: t,
                  ui_type,
                  ui: { ...ui },
                  ...additional,
                };
              }
              return fields;
            },
            {}
          ),
          outputs: _.reduce(
            schema.additionalProperties.outputs.properties,
            (outputs: Record<string, any>, property, id) => {
              let t = property.type;
              if (
                'allOf' in property &&
                property.allOf[0].title === 'ImageField'
              ) {
                t = 'image';
              }

              outputs[id] = {
                label: property.title,
                type: t,
                ui: { ...property.ui },
              };
              return outputs;
            },
            {}
          ),
        };
      }
      return schemas;
    },
    {}
  );
};

export default parseSchema;
