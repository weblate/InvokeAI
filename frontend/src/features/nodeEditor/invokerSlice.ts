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
} from 'reactflow';
import _ from 'lodash';
import SwaggerParser from 'swagger-parser';
import { Invocation, InvocationGraph } from './types';
import parseSchema from './parseSchema';
import { Configuration, ContextsApi, SessionsApi } from '../../openapi-generator';

export type InvokerState = {
  nodes: Node[];
  edges: Edge[];
  schema?: any;
  error?: string;
  schemaGeneratedInvocations?: Record<string, Omit<Invocation, 'moduleId'>>;
  contexts: string[];
};

const initialState: InvokerState = {
  nodes: [],
  edges: [],
  contexts: [],
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

      const node: Node = {
        id: uuid,
        type: 'invocation',
        dragHandle: '.node-drag-handle',
        position: { x: 0, y: 0 },
        data: invocation,
      };

      state.nodes.push(node);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSchema.pending, (state) => {
        // TODO: add some kind of API status indicator
      })
      .addCase(getSchema.fulfilled, (state, action) => {
        const schema = action.payload;

        console.log('OpenAPI schema:', schema);

        const invocations: Record<
          string,
          Omit<Invocation, 'moduleId'>
        > = parseSchema(schema);

        console.log('Parsed invocations:', invocations);

        state.schemaGeneratedInvocations = invocations;
      })
      .addCase(getSchema.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(listContexts.fulfilled, (state, action) => {
        state.contexts = action.payload;
      })
      .addCase(listContexts.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createContext.fulfilled, (state, action) => {
        const context = action.payload;
        state.contexts.push(context.id);
      })
      .addCase(createContext.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

const sessionsApiConfiguration = new Configuration({
  basePath: new URL(window.location.href).origin,
});

const sessionsApi = new SessionsApi(sessionsApiConfiguration)


const res = await sessionsApi.listSessionsApiV1SessionsGet()

const origin = new URL(window.location.href).origin;
const api = `${origin}/api/v1/contexts/`;

// Grabs the API schema so we can build a UI from it
export const getSchema = createAsyncThunk('invoker/getSchema', async () => {
  const schema = await SwaggerParser.dereference(`${origin}/openapi.json`);

  return schema;
});

export const listContexts = createAsyncThunk(
  'invoker/listContexts',
  async ({ page, per_page }: { page?: number; per_page?: number }) => {
    const query = `?page=${page}&per_page=${per_page}`;
    const response = await fetch(api.concat(query), { method: 'GET' });
    const contexts = await response.json();
    return contexts;
  }
);

export const createContext = createAsyncThunk(
  'invoker/createContext',
  async (invocationGraph?: InvocationGraph) => {
    const init: RequestInit = { method: 'POST' };
    if (invocationGraph) {
      init.headers = { 'Content-Type': 'application/json' };
      init.body = JSON.stringify(invocationGraph);
    }
    const response = await fetch(api, init);
    const context = await response.json();
    return context;
  }
);

export const getContext = createAsyncThunk(
  'invoker/getContext',
  async (id: string) => {
    const response = await fetch(api.concat(id), { method: 'GET' });
    const context = await response.json();
    return context;
  }
);

export const appendInvocationToContext = createAsyncThunk(
  'invoker/appendInvocationToContext',
  async ({
    id,
    invocationGraph,
  }: {
    id: string;
    invocationGraph: InvocationGraph;
  }) => {
    const init: RequestInit = { method: 'POST' };
    if (invocationGraph) {
      init.headers = { 'Content-Type': 'application/json' };
      init.body = JSON.stringify(invocationGraph);
    }
    const response = await fetch(api.concat(id, '/invocations'), init);
    const context = await response.json();
    return context;
  }
);

export const invokeContext = createAsyncThunk(
  'invoker/invokeContext',
  async ({ id, all }: { id: string; all?: boolean }) => {
    const response = await fetch(
      api.concat(id, '/invoke', all ? '?all=true' : ''),
      { method: 'PUT' }
    );
    const contexts = await response.json();
    return contexts;
  }
);

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
