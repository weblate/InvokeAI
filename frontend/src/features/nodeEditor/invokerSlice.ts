import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  updateEdge,
} from 'react-flow-renderer';
import _ from 'lodash';
import makeSimplePromptModule from './modules/simplePrompt';
import makeGenerateModule from './modules/generateModule';
import makeUpscaleModule from './modules/upscaleModule';
import makeShowImageModule from './modules/showImage';
import makeLoadImageModule from './modules/loadImage';
import SwaggerParser from 'swagger-parser';
import { Invocation } from './types';

export type InvokerState = {
  nodes: Node[];
  edges: Edge[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  schema?: any;
  error?: string;
  schemaGeneratedInvocations?: Record<string, Omit<Invocation, 'moduleId'>>;
};

const initialState: InvokerState = {
  nodes: [],
  edges: [],
  status: 'idle',
};

export const invokerSlice = createSlice({
  name: 'invoker',
  initialState,
  reducers: {
    onNodesChange: (
      state,
      action: PayloadAction<{ changes: NodeChange[] }>
    ) => {
      const { changes } = action.payload;
      state.nodes = applyNodeChanges(changes, state.nodes);
    },
    onEdgesChange: (
      state,
      action: PayloadAction<{ changes: EdgeChange[] }>
    ) => {
      const { changes } = action.payload;
      state.edges = applyEdgeChanges(changes, state.edges);
    },
    setEdges: (state, action: PayloadAction<Edge<any>[]>) => {
      state.edges = action.payload;
    },
    onConnect: (state, action: PayloadAction<{ connection: Connection }>) => {
      const { connection } = action.payload;
      const sourceNode = state.nodes.find((n) => n.id === connection.source);
      if (sourceNode) {
        if (connection.sourceHandle) {
          const sourceDataType =
            sourceNode.data.outputs[connection.sourceHandle].type;

          state.edges = addEdge(
            {
              ...connection,
              className: `invoke-ai__edge invoke-ai__edge_${sourceDataType}`,
            },
            state.edges
          );
        }
      }
    },
    onEdgeUpdate: (
      state,
      action: PayloadAction<{ oldEdge: Edge; newConnection: Connection }>
    ) => {
      const { oldEdge, newConnection } = action.payload;
      state.edges = updateEdge(oldEdge, newConnection, state.edges);
    },
    updateModuleParameterValue: (
      state,
      action: PayloadAction<{ id: string; fieldId: string; value: any }>
    ) => {
      const { id, fieldId, value } = action.payload;
      const index = state.nodes.findIndex((n) => n.id === id);

      // Array.prototype.findIndex() returns -1 if not found
      if (index >= 0) {
        state.nodes[index].data.fields[fieldId].value = value;
      }
    },
    addModule: (
      state,
      action: PayloadAction<{ uuid: string; invocation: Invocation }>
    ) => {
      const { uuid, invocation } = action.payload;

      // const data = (() => {
      //   switch (moduleType) {
      //     case 'simplePrompt':
      //       return makeSimplePromptModule();
      //     case 'generate':
      //       return makeGenerateModule();
      //     case 'upscale':
      //       return makeUpscaleModule();
      //     case 'showImage':
      //       return makeShowImageModule();
      //     case 'loadImage':
      //       return makeLoadImageModule();
      //     default:
      //       return false;
      //   }
      // })();

      // if (data) {
      const node: Node = {
        id: uuid,
        type: 'invocation',
        dragHandle: '.node-drag-handle',
        position: { x: 0, y: 0 },
        data: invocation,
      };

      state.nodes.push(node);
      // }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSchema.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getSchema.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const schema = action.payload;

        console.log(schema);
        const invocations: Record<
          string,
          Omit<Invocation, 'moduleId'>
        > = _.reduce(
          schema.components.schemas,
          (schemas: Record<string, any>, schema, id) => {
            if (id.match(/Invocation$/)) {
              schemas[id] = {
                moduleType: schema.properties.type.enum[0],
                moduleLabel: id,
                fields: _.reduce(
                  schema.properties,
                  (fields: Record<string, any>, property, id) => {
                    if (!['id', 'type'].includes(id)) {
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
                        label: title,
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
        console.log(invocations);
        state.schemaGeneratedInvocations = invocations;
      })
      .addCase(getSchema.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Grabs the API schema so we can build a UI from it
export const getSchema = createAsyncThunk('invoker/getSchema', async () => {
  const api = await SwaggerParser.dereference(
    'http://0.0.0.0:9090/openapi.json'
  );

  return api;
});

export const {
  onNodesChange,
  onEdgesChange,
  setEdges,
  onConnect,
  onEdgeUpdate,
  updateModuleParameterValue,
  addModule,
} = invokerSlice.actions;

export default invokerSlice.reducer;
