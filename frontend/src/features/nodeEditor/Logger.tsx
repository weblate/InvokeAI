import { Box } from '@chakra-ui/react';
import { useEdges, useNodes } from 'reactflow';
import prepareState from './prepareState';

const Logger = () => {
  const nodes = useNodes();
  const edges = useEdges();

  const data = prepareState(nodes, edges);
  return (
    <Box fontSize={12}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Box>
  );
};

export default Logger;
