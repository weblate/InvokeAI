import { Box, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import { AnyAction } from '@reduxjs/toolkit';
import { useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  NodeChange,
  useReactFlow,
} from 'react-flow-renderer';
import SwaggerParser from 'swagger-parser';
import { v4 as uuidv4 } from 'uuid';
import { RootState, useAppDispatch, useAppSelector } from '../../app/store';
import Legend from './Legend';
import Logger from './Logger';
import ModuleUIBuilder from './ModuleUIBuilder';
import {
  addModule,
  getSchema,
  onConnect,
  onEdgesChange,
  onEdgeUpdate,
  onNodesChange,
  setEdges,
} from './invokerSlice';
import prepareState from './prepareState';
import _ from 'lodash';

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
  invocation: ModuleUIBuilder,
};

function Flow() {
  const { nodes, edges } = useAppSelector(
    (state: RootState) => state.invoker
  );

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

  const handleClickAddModule = useCallback(
    (moduleType: string) => {
      dispatch(addModule({ moduleType, uuid: uuidv4() }));
    },
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

  useEffect(() => {
    dispatch(getSchema());
  }, [dispatch]);

  const handleClickProcess = useCallback(() => {
    const nodes = flow.getNodes();
    const edges = flow.getEdges();

    const data = prepareState(nodes, edges);
    console.log(data);

    fetch('http://0.0.0.0:9090/api/v1/invocations/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [flow]);


  return (
    <Flex gap={2} width={'100%'} height={'100%'} direction={'column'}>
      <Flex gap={2} alignItems={'center'}>
        <Button onClick={() => handleClickAddModule('simplePrompt')}>
          Simple Prompt
        </Button>
        <Button onClick={() => handleClickAddModule('generate')}>
          Generate
        </Button>
        <Button onClick={() => handleClickAddModule('upscale')}>Upscale</Button>
        <Button onClick={() => handleClickAddModule('showImage')}>
          Show Image
        </Button>
        <Button onClick={() => handleClickAddModule('loadImage')}>
          Load Image
        </Button>
        <Legend />
        <Button onClick={handleClickProcess}>Process</Button>
      </Flex>
      <Flex>
        <Box height={'calc(100vh - 100px)'} width={'66vw'}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleOnNodesChange}
            onEdgesChange={handleOnEdgesChange}
            onEdgeUpdate={handleOnEdgeUpdate}
            onConnect={handleOnConnect}
            nodeTypes={nodeTypes}
            onEdgeUpdateStart={handleOnEdgeUpdateStart}
            onEdgeUpdateEnd={handleOnEdgeUpdateEnd}
            defaultZoom={2}
            fitView
          />
        </Box>
        <Box height={'calc(100vh - 100px)'} width={'34vw'} overflowY={'scroll'}>
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
