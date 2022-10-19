import { createAsyncThunk } from '@reduxjs/toolkit';
import SwaggerParser from 'swagger-parser';
import {
  AppendInvocationRequest,
  CreateSessionRequest,
  GetImageRequest,
  GetSessionRequest,
  InvokeSessionRequest,
  ListSessionsRequest,
} from '../types';

const basePath = new URL(window.location.href).origin;
const sessionsApiPath = `${basePath}/api/v1/sessions`;
const imagesApiPath = `${basePath}/api/v1/images`;

export const getSchema = createAsyncThunk('invoker/getSchema', async () => {
  const schema = await SwaggerParser.dereference(`${basePath}/openapi.json`);

  return schema;
});

export const listSessions = createAsyncThunk(
  'invoker/listSessions',
  async (request: ListSessionsRequest) => {
    let url = '';

    if (Object.keys(request).length > 0) {
      const queryStrings: string[] = [];
      if (request.page !== undefined) {
        queryStrings.push(`page=${request.page}`);
      }
      if (request.perPage !== undefined) {
        queryStrings.push(`per_page=${request.perPage}`);
      }
      url = '?'.concat(queryStrings.join('&'));
    }

    const init: RequestInit = { method: 'GET' };

    const response = await fetch(sessionsApiPath.concat(`/${url}`), init);

    const sessions = await response.json();

    return sessions;
  }
);

export const getSession = createAsyncThunk(
  'invoker/getSession',
  async (request: GetSessionRequest) => {
    const { sessionId } = request;

    const init: RequestInit = { method: 'GET' };

    const response = await fetch(
      sessionsApiPath.concat(`/${encodeURIComponent(sessionId)}`),
      init
    );

    const session = await response.json();

    return session;
  }
);

export const createSession = createAsyncThunk(
  'invoker/createSession',
  async (request: CreateSessionRequest) => {
    const { invocationGraph } = request;

    const init: RequestInit = { method: 'POST' };

    if (invocationGraph) {
      init.headers = { 'Content-Type': 'application/json' };
      init.body = JSON.stringify(invocationGraph);
    }

    const response = await fetch(sessionsApiPath.concat('/'), init);

    const session = await response.json();

    return session;
  }
);

export const appendInvocation = createAsyncThunk(
  'invoker/appendInvocation',
  async (request: AppendInvocationRequest) => {
    const { sessionId, invocationGraph } = request;

    const init: RequestInit = { method: 'POST' };

    if (invocationGraph) {
      init.headers = { 'Content-Type': 'application/json' };
      init.body = JSON.stringify(invocationGraph);
    }

    const response = await fetch(
      sessionsApiPath.concat(`/${encodeURIComponent(sessionId)}/invocations`),
      init
    );

    const session = await response.json();

    return session;
  }
);

export const invokeSession = createAsyncThunk(
  'invoker/invokeSession',
  async (request: InvokeSessionRequest) => {
    const { sessionId, all } = request;

    let url = `/${encodeURIComponent(sessionId)}/invoke`;

    if (all !== undefined) {
      url = url.concat(`?all=${all ? 'true' : 'false'}`);
    }

    const response = await fetch(sessionsApiPath.concat(url), {
      method: 'PUT',
    });

    console.log(response);
    // const session = await response.json();
    // console.log(session);

    // return session;
  }
);

export const getImage = createAsyncThunk(
  'invoker/getImage',
  async (request: GetImageRequest) => {
    const { imageType, imageName } = request;

    const response = await fetch(
      imagesApiPath.concat(
        `/${encodeURIComponent(imageType)}/${encodeURIComponent(imageName)}`
      )
    );

    const image = await response.json();

    return image;
  }
);
