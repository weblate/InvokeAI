import { Box, Flex, Heading } from '@chakra-ui/react';
import { Handle, Position } from 'react-flow-renderer';
import ImageToImageOptions from '../options/ImageToImageOptions';
import OutputOptions from '../options/OutputOptions';
import SamplerOptions from '../options/SamplerOptions';
import SeedVariationOptions from '../options/SeedVariationOptions';

function InitialImageNode() {
  return (
    <Flex borderWidth={1} p={2} rounded={'md'} direction={'column'}>
      <Heading size={'sm'}>Initial Image</Heading>
      <ImageToImageOptions />

      <Handle type="source" position={Position.Right} id="output" />
    </Flex>
  );
}

export default InitialImageNode;
