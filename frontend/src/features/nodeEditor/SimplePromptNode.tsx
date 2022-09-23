import { Box, Flex, Heading, Textarea } from '@chakra-ui/react';
import { Handle, Position } from 'react-flow-renderer';
import PromptInput from '../options/PromptInput';

function SimplePromptNode(props: { data: any }) {
  const { data } = props;
  console.log(data);
  return (
    <Flex borderWidth={1} p={2} rounded={'md'} direction={'column'}>
      <Heading size={'sm'}>Simple Prompt</Heading>
      <Textarea value={data.parameters.prompt} />
      <Handle type="source" position={Position.Right} id="output" />
    </Flex>
  );
}

export default SimplePromptNode;
