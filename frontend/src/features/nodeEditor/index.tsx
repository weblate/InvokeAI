import { Box, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { AnyAction } from '@reduxjs/toolkit';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
  Connection,
  Controls,
  Edge,
  EdgeChange,
  getRectOfNodes,
  MiniMap,
  NodeChange,
  useKeyPress,
  useReactFlow,
} from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { RootState, useAppDispatch, useAppSelector } from '../../app/store';
import Legend from './Legend';
import Logger from './Logger';
import {
  addModule,
  onConnect,
  onEdgesChange,
  onEdgeUpdate,
  onNodesChange,
  setEdges,
} from './invokerSlice';
import prepareState from './prepareState';
import _ from 'lodash';
import { Invocation } from './types';
import InvocationUIBuilder from './InvocationUIBuilder';
import InvocationGroup from './components/InvocationGroup';
import CustomEdge from './components/Edge';
import {
  AppendInvocationRequest,
  CreateSessionRequest,
  GetImageRequest,
  GetSessionRequest,
  InvocationGraph,
  InvokeSessionRequest,
} from '../../openapi-generator';
import {
  getSchema,
  listSessions,
  getSession,
  createSession,
  appendInvocation,
  invokeSession,
  getImage,
} from './api/api';
import { io } from 'socket.io-client';

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
  invocation: InvocationUIBuilder,
  invocationGroup: InvocationGroup,
};

const edgeTypes = {
  custom: CustomEdge,
};

const socket_url = `ws://${window.location.host}`;
console.log(socket_url);
const socket = io(socket_url, {
  path: '/ws/socket.io',
});

socket.on('connect', () => {
  console.log('connected');
});

socket.on('generator_progress', (data) =>
  console.log('generator_progress', data)
);
socket.on('invocation_complete', (data) =>
  console.log('invocation_complete', data)
);
socket.on('invocation_started', (data) =>
  console.log('invocation_started', data)
);
socket.on('session_complete', (data) => {
  console.log('session_complete', data);

  // NOTE: you may not want to unsubscribe if you plan to continue using this session,
  //       just make sure you unsubscribe eventually
  socket.emit('unsubscribe', { session: data.session_id });
});

function Flow() {
  const { nodes, edges, schemaGeneratedInvocations, sessionId } =
    useAppSelector((state: RootState) => state.invoker);

  const dispatch = useAppDispatch();

  const edgeUpdateSuccessful = useRef(true);

  const handleOnNodesChange = useCallback(
    (changes: NodeChange[]): AnyAction => dispatch(onNodesChange({ changes })),
    [dispatch]
  );

  const handleOnEdgesChange = useCallback(
    (changes: EdgeChange[]): AnyAction => dispatch(onEdgesChange({ changes })),
    [dispatch]
  );

  const handleOnEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection): AnyAction =>
      dispatch(onEdgeUpdate({ oldEdge, newConnection })),
    [dispatch]
  );

  const handleOnEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const handleOnEdgeUpdateEnd = useCallback(
    (_: MouseEvent, edge: Edge<any>) => {
      if (!edgeUpdateSuccessful.current) {
        dispatch(setEdges(edges.filter((e) => e.id !== edge.id)));
      }

      edgeUpdateSuccessful.current = true;
    },
    [dispatch, edges]
  );

  const handleOnConnect = useCallback(
    (connection: Connection): AnyAction => dispatch(onConnect({ connection })),
    [dispatch]
  );

  const miniMapBgColor = useColorModeValue(
    'white',
    'var(--chakra-colors-gray-800)'
  );

  const miniMapMaskColor = useColorModeValue(
    'rgb(240, 242, 243, 0.7)',
    'rgba(0,0,0,0.2)'
  );

  const miniMapNodeColor = useColorModeValue(
    'rgba(0,0,0,0.1)',
    'rgba(255,255,255,0.1)'
  );

  const flow = useReactFlow();

  const cmdAndGPressed = useKeyPress(['Meta+g', 'Strg+g']);

  useEffect(() => {
    if (sessionId) {
      console.log('subscribing to', sessionId);
      socket.emit('subscribe', { session: sessionId });
    }
  }, [sessionId]);

  useEffect(() => {
    if (cmdAndGPressed) {
      // group nodes
      const selectedNodes = flow.getNodes().filter((node) => node.selected);

      if (selectedNodes.length) {
        const groupNodeId = uuidv4();
        const parentPadding = 10;
        const rect = getRectOfNodes(selectedNodes);

        const newNodes = flow.getNodes().map((node) => {
          if (node.selected) {
            node.parentNode = groupNodeId;
            node.extent = 'parent';
            // child nodes are positioned absolutely and relative to parent, calculate new positions
            node.position = {
              x: 0 - rect.x + node.position.x + parentPadding,
              y: 0 - rect.y + node.position.y + parentPadding,
            };
          }
          return node;
        });

        const { x, y, width, height } = rect;
        const groupNode = {
          id: groupNodeId,
          data: { label: 'Group' },
          type: 'invocationGroup',
          position: {
            x: x - parentPadding,
            y: y - parentPadding,
          },
          style: {
            width: width + parentPadding * 2,
            height: height + parentPadding * 2,
          },
        };

        flow.setNodes([groupNode, ...newNodes]);
      }
    }
  }, [cmdAndGPressed, flow]);

  useEffect(() => {
    dispatch(getSchema());
  }, [dispatch]);

  const handleClickListSessions = () => {
    dispatch(listSessions({ page: 0, perPage: 10 }));
  };

  const handleClickGetSession = (request: GetSessionRequest) => {
    dispatch(getSession(request));
  };

  const handleClickCreateSession = () => {
    const nodes = flow.getNodes();
    const edges = flow.getEdges();
    const invocationGraph = prepareState(nodes, edges);
    dispatch(createSession({ invocationGraph }));
  };

  // const handleClickAppendInvocation = (request: AppendInvocationRequest) => {
  //   dispatch(appendInvocation(request));
  // };

  const handleClickInvokeSession = () => {
    sessionId && dispatch(invokeSession({ sessionId, all: true }));
  };

  // const handleClickGetImage = (request: GetImageRequest) => {
  //   dispatch(getImage(request));
  // };

  // const handleClickProcess = useCallback(() => {
  //   const nodes = flow.getNodes();
  //   const edges = flow.getEdges();
  //   const data = prepareState(nodes, edges);
  // }, [flow]);

  // const handleClickProcess = useCallback(() => {
  //   const nodes = flow.getNodes();
  //   const edges = flow.getEdges();

  //   const data = prepareState(nodes, edges);
  //   console.log(data);

  //   fetch('http://0.0.0.0:9090/api/v1/invocations/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [flow]);

  return (
    <Flex gap={2} width={'100%'} height={'100%'} direction={'column'}>
      <Flex gap={2} alignItems={'center'}>
        {schemaGeneratedInvocations &&
          _.map(schemaGeneratedInvocations, (invocation, name) => {
            return (
              <Button
                key={name}
                onClick={() => {
                  const i: Invocation = { ...invocation, moduleId: uuidv4() };
                  dispatch(addModule({ uuid: uuidv4(), invocation: i }));
                }}
              >
                {invocation.moduleLabel.replace('Invocation', '')}
              </Button>
            );
          })}
        <Legend />
      </Flex>
      <Flex>
        <Button onClick={() => handleClickListSessions()}>List sessions</Button>
        {/*         <Button onClick={() => handleClickGetSession()}>Get session</Button>
         */}{' '}
        <Button onClick={() => handleClickCreateSession()}>
          Create session
        </Button>
        {/*        <Button onClick={() => handleClickAppendInvocation()}>
          Append invocation
        </Button>
*/}{' '}
        <Button
          onClick={() => handleClickInvokeSession()}
          isDisabled={!sessionId}
        >
          Invoke session
        </Button>
        {/*        <Button onClick={() => handleClickGetImage()}>Get Image</Button>
         */}{' '}
      </Flex>
      <Flex>
        <Box height={'calc(100vh - 100px)'} width={'100vw'}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleOnNodesChange}
            onEdgesChange={handleOnEdgesChange}
            onEdgeUpdate={handleOnEdgeUpdate}
            onConnect={handleOnConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onEdgeUpdateStart={handleOnEdgeUpdateStart}
            onEdgeUpdateEnd={handleOnEdgeUpdateEnd}
            fitView
          />
        </Box>
        <Box zIndex={-99} position={'absolute'} top={0} left={0}>
          <Logger />
        </Box>
      </Flex>
      <Controls />
      <MiniMap
        style={{ backgroundColor: miniMapBgColor }}
        maskColor={miniMapMaskColor}
        nodeColor={miniMapNodeColor}
      />
    </Flex>
  );
}

export default Flow;
