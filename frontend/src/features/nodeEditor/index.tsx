import { Box, Button, Flex } from '@chakra-ui/react';
import { AnyAction } from '@reduxjs/toolkit';
import { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  updateEdge,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from 'react-flow-renderer';
import './flow.css';
import { RootState, useAppDispatch, useAppSelector } from '../../app/store';
import ModuleUIBuilder from './ModuleBuilder';
import {
  addModule,
  NodeEditorState,
  onConnect,
  onEdgesChange,
  onEdgeUpdate,
  onNodesChange,
} from './nodeEditorSlice';
import { v4 as uuidv4 } from 'uuid';

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
  module: ModuleUIBuilder,
};

function Flow() {
  const { nodes, edges } = useAppSelector(
    (state: RootState) => state.nodeEditor
  );

  const dispatch = useAppDispatch();

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

  return (
    <Flex gap={2} width={'100%'} height={'100%'} direction={'column'}>
      <Flex gap={2}>
        <Button onClick={() => handleClickAddModule('simplePrompt')}>
          Simple Prompt
        </Button>
        <Button onClick={() => handleClickAddModule('initialImage')}>
          Initial Image
        </Button>
        <Button onClick={() => handleClickAddModule('generate')}>
          Generate
        </Button>
        <Button onClick={() => handleClickAddModule('upscale')}>
          Upscale
        </Button>
      </Flex>
      <Box height={'calc(100vh - 100px)'} width={'100vw'}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={handleOnNodesChange}
            onEdgesChange={handleOnEdgesChange}
            onEdgeUpdate={handleOnEdgeUpdate}
            onConnect={handleOnConnect}
            nodeTypes={nodeTypes}
            fitView
          />
          <Controls />
          <MiniMap />
        </ReactFlowProvider>
      </Box>
    </Flex>
  );
}

export default Flow;
