import { Box, Flex } from '@chakra-ui/react';

const Legend = () => {
  const legend = [
    { type: 'string', label: 'Text' },
    { type: 'image', label: 'Image' },
    { type: 'integer', label: 'Integer' },
    { type: 'number', label: 'Number' },
    { type: 'boolean', label: 'Boolean' },
  ];

  return (
    <Flex gap={2}>
      {legend.map((legendItem, i) => (
        <Box
          key={i}
          className={`datatype-${legendItem.type}`}
          pl={2}
          pr={2}
          pt={0.5}
          pb={0.5}
          rounded={'md'}
          textTransform={'uppercase'}
          fontSize={'xs'}
          fontWeight={'bold'}
        >
          {legendItem.label}
        </Box>
      ))}
    </Flex>
  );
};

export default Legend;
