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
import { ModuleParameter } from './types';
import simplePromptModule from './modules/simplePrompt';
import generateModule from './modules/generateModule';
import initialImageModule from './modules/initialImageModule';
import upscaleModule from './modules/upscaleModule';

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
      state.edges = addEdge(connection, state.edges);
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
      action: PayloadAction<{ id: string; parameterName: string; value: any }>
    ) => {
      const { id, parameterName, value } = action.payload;

      state.nodes = state.nodes.map((node) => {
        if (node.id === id) {
          node.data.parameters = node.data.parameters.map(
            (p: ModuleParameter) => {
              if (p.name === parameterName) {
                p.value = value;
              }
              return p;
            }
          );
        }
        return node;
      });
    },
    addModule: (
      state,
      action: PayloadAction<{ uuid: string; moduleType: string }>
    ) => {
      const { uuid, moduleType } = action.payload;
      const node: Node = {
        id: `${moduleType}_${uuid}`,
        type: 'module',
        dragHandle: '.node-drag-handle',
        position: { x: 0, y: 0 },
        data: undefined,
      };
      switch (moduleType) {
        case 'simplePrompt':
          node.data = simplePromptModule;
          break;
        case 'generate':
          node.data = generateModule;
          break;
        case 'initialImage':
          node.data = initialImageModule;
          break;
        case 'upscale':
          node.data = upscaleModule;
          break;
        default:
          return state;
      }
      state.nodes.push(node);
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
