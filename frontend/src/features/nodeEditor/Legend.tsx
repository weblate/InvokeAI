import { Box, Flex } from '@chakra-ui/react';

const Legend = () => {
  const legend = [
    { dataType: 'string', label: 'Text' },
    { dataType: 'image', label: 'Image' },
    { dataType: 'integer', label: 'Integer' },
    { dataType: 'number', label: 'Number' },
    { dataType: 'boolean', label: 'Boolean' },
  ];

  return (
    <Flex gap={2}>
      {legend.map((legendItem, i) => (
        <Box
          key={i}
          className={`invoke-ai__handle_${legendItem.dataType}`}
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
