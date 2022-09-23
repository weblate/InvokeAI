import { Box, Flex, Heading } from '@chakra-ui/react';
import { Handle, Position } from 'react-flow-renderer';
import OutputOptions from '../options/OutputOptions';
import SamplerOptions from '../options/SamplerOptions';
import SeedVariationOptions from '../options/SeedVariationOptions';

function GenerateNode() {
  return (
    <Flex borderWidth={1} p={2} rounded={'md'} direction={'column'}>
      <Handle
        type="target"
        position={Position.Left}
        id="prompt"
        style={{ top: '33%' }}
      />

      <Handle
        type="target"
        position={Position.Left}
        id="initialImage"
        style={{ top: '66%' }}
      />

      <Heading size={'sm'}>Generate</Heading>
      <SeedVariationOptions />
      <SamplerOptions />
      <OutputOptions />

      <Handle type="source" position={Position.Right} id="output" />
    </Flex>
  );
}

export default GenerateNode;
