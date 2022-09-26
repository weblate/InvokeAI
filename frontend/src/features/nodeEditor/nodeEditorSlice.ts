import { createSlice } from '@reduxjs/toolkit';
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

export type NodeEditorState = {
  nodes: Node[];
  edges: Edge[];
};

const initialState: NodeEditorState = {
  nodes: [],
  edges: [],
};

export const nodeEditorSlice = createSlice({
  name: 'nodeEditor',
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
            sourceNode.data.outputs[connection.sourceHandle].dataType;

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
      action: PayloadAction<{ uuid: string; moduleType: string }>
    ) => {
      const { uuid, moduleType } = action.payload;

      const data = (() => {
        switch (moduleType) {
          case 'simplePrompt':
            return makeSimplePromptModule();
          case 'generate':
            return makeGenerateModule();
          case 'upscale':
            return makeUpscaleModule();
          case 'showImage':
            return makeShowImageModule();
          case 'loadImage':
            return makeLoadImageModule();
          default:
            return false;
        }
      })();

      if (data) {
        const node: Node = {
          id: uuid,
          type: 'invocation',
          dragHandle: '.node-drag-handle',
          position: { x: 0, y: 0 },
          data,
        };

        state.nodes.push(node);
      }
    },
  },
});

export const {
  onNodesChange,
  onEdgesChange,
  setEdges,
  onConnect,
  onEdgeUpdate,
  updateModuleParameterValue,
  addModule,
} = nodeEditorSlice.actions;

export default nodeEditorSlice.reducer;
