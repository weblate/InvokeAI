import { Text } from '@chakra-ui/react';
import _ from 'lodash';
// import { json } from './modules/upscaleSchema';
import SwaggerParser from '@apidevtools/swagger-parser';
import json from './testSchema.json';
import { useEffect, useState } from 'react';

type UIHint = {
  label: string;
  type: string;
  withNumberInput?: boolean;
};

const ModuleBuilder = () => {
  const [schema, setSchema] = useState<any>();
  const [uiSchema, setUiSchema] = useState<any>();

  useEffect(() => {
    const api = SwaggerParser.dereference(json, (err, api) => {
      if (err) {
        console.error(err);
      } else {
        console.log(api);
        setSchema(api);
      }
    });
  }, []);

  useEffect(() => {
    if (schema) {
      const filteredProperties = _.reduce(
        schema.components.schemas.Upscale.properties,
        (acc, value, key) => {
          if (key !== 'id' && key !== 'type') {
            (acc as any)[key] = value;
          }
          return acc;
        },
        {}
      );
      console.log(filteredProperties);

      _.map(filteredProperties, (property) => {
        const { uiHint } = property;
        return;
      });
    }
  }, [schema]);

  // const upscaleSchema = json.components.schemas.Upscale;
  // const upscaleLevelSchema = json.components.schemas.UpscaleLevel;
  // const upscaleOutputSchema = json.components.schemas.UpscaleOutputs;

  // const { title, properties } = upscaleSchema;

  // // No UI elements for 'id' and 'type' properties
  // const filteredProperties = _.reduce(
  //   properties,
  //   (acc, value, key) => {
  //     if (key !== 'id' && key !== 'type') {
  //       (acc as any)[key] = value;
  //     }
  //     return acc;
  //   },
  //   {}
  // );

  // const uiSchema = (
  //   Object.keys(filteredProperties) as Array<keyof typeof filteredProperties>
  // ).map((key): any => {
  //   const uiHint: UIHint = filteredProperties[key]?.uiHint;
  //   console.log(uiHint);
  //   const label = uiHint?.label || filteredProperties[key]?.title;
  //   console.log(label);
  // });

  // console.log(filteredProperties);
  return <></>;
  // type GenericObject = Record<string, any>;
  // const uiSchema: GenericObject = {};

  // const elements = filteredKeys.map((key) => {
  //   let schemaProperty: GenericObject = {};

  //   let property = properties[key as keyof typeof properties];

  //   let propertyType = 'type' in property ? property.type : '';
  //   // infer type to be select type
  //   if ('allOf' in property) {
  //     property = schema.UpscaleLevel;
  //     propertyType = 'select';
  //   }

  //   // if ('uiHint' in property) {
  //   // }
  //   switch (propertyType) {
  //     case 'select':
  //       return '';
  //     case 'string':
  //       return (
  //         <Text>
  //           {property?.uiHint?.label ? property.uiHint.label : property.title}
  //         </Text>
  //       );
  //     case 'number':
  //     case 'integer':
  //       return '';
  //   }
  // });
};

export default ModuleBuilder;
