import { Box, Flex, Heading, IconButton, Spacer } from '@chakra-ui/react';
import { NodeProps } from 'reactflow';

const InvocationGroup = (props: NodeProps<any>) => {
  const {
    selected,
    data: { label },
  } = props;
  console.log(props);
  return (
    <Box borderLeftWidth={1} borderRightWidth={1} borderBottomWidth={1} display={'inline-block'} rounded={'md'} borderTopRadius={0} width={'100%'} height={'100%'} position={'relative'}>
      <Box
        className={`node-drag-handle invoke-ai__module_header ${
          selected && 'selected'
        }`}
        cursor={'move'}
        borderTopRadius={'md'}
        borderLeftWidth={1}
        borderRightWidth={1}
        borderTopWidth={1}
        p={2}
        position={'absolute'}
        width={'calc(100% + 2px)'}
        top={'-34px'}
        marginLeft={'-1px'}
        marginRight={'-1px'}
      >
        <Heading size={'sm'}>{label}</Heading>
        <Spacer />
      </Box>
    </Box>
  );
};

export default InvocationGroup;
