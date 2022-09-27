import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import _ from 'lodash';
import { useCallback } from 'react';
import { Connection, NodeProps, useReactFlow } from 'react-flow-renderer';
import FieldComponentLabel from './components/FieldComponentLabel';
import FieldComponent from './FieldComponent';
import ModuleHandle from './ModuleHandle';
import { Invocation } from './types';

function ModuleUIBuilder(props: NodeProps<Invocation>) {
  const { id: moduleId, data, selected } = props;
  const { moduleLabel, fields, outputs } = data;

  // const moduleBgColor = useColorModeValue('white', 'gray.800');
  // const headerBgColor = useColorModeValue('gray.100', 'gray.700');
  // const headerSelectedBgColor = useColorModeValue('blue.100', 'blue.700');
  // const moduleSelectedBorderColor = useColorModeValue('blue.200', 'blue.800');

  const flow = useReactFlow();

  // Check if an in-progress connection is valid
  const isValidConnection = useCallback(
    (connection: Connection): boolean => {
      const edges = flow.getEdges();
      // Connection is invalid if target already has a connection
      if (
        edges.find((edge) => {
          return (
            edge.target === connection.target &&
            edge.targetHandle === connection.targetHandle
          );
        })
      ) {
        return false;
      }

      // Find the source and target nodes...
      if (connection.source && connection.target) {
        const sourceNode = flow.getNode(connection.source);
        const targetNode = flow.getNode(connection.target);

        // Conditional guards against undefined nodes/handles
        if (
          sourceNode &&
          targetNode &&
          connection.sourceHandle &&
          connection.targetHandle
        ) {
          // connection dataTypes must be the same for a connection
          return (
            sourceNode.data.outputs[connection.sourceHandle].dataType ===
            targetNode.data.fields[connection.targetHandle].dataType
          );
        }
      }

      // Default to invalid
      return false;
    },
    [flow]
  );

  // const isDependsOnConnected = useCallback(
  //   (field: Field): boolean => {
  //     return field.dependsOn
  //       ? Boolean(
  //           flow
  //             .getEdges()
  //             .find(
  //               (edge) =>
  //                 edge.target === moduleId &&
  //                 edge.targetHandle ===
  //                   fields[field.dependsOn as keyof Field].id
  //             )
  //         )
  //       : true;
  //   },
  //   [flow, moduleId, fields]
  // );

  return (
    <Flex
      borderWidth={1}
      rounded={'md'}
      direction={'column'}
      cursor={'initial'}
      minWidth={'300px'}
      className={`ivoke-ai__module ${selected && 'selected'}`}
    >
      <Flex
        className={`node-drag-handle invoke-ai__module_header ${
          selected && 'selected'
        }`}
        cursor={'move'}
        borderTopRadius={'md'}
        p={2}
      >
        <Heading size={'sm'}>{moduleLabel}</Heading>
      </Flex>
      <Flex direction={'column'} gap={2} cursor={'initial'} p={2}>
        {_.map(fields, (field, id) => {
          const { dataType, label, requiresConnection } = field;
          const isDisabled = !(field.dependsOn
            ? Boolean(
                flow
                  .getEdges()
                  .find(
                    (edge) =>
                      edge.target === moduleId &&
                      edge.targetHandle === field.dependsOn
                  )
              )
            : true);
          return (
            <Box key={id} position={'relative'} width={'100%'}>
              <FieldComponentLabel field={field} isDisabled={isDisabled}>
                {!requiresConnection && (
                  <FieldComponent
                    field={field}
                    moduleId={moduleId}
                    fieldId={id}
                  />
                )}
              </FieldComponentLabel>
              {requiresConnection && (
                <ModuleHandle
                  handleType={'target'}
                  id={id}
                  dataType={dataType}
                  label={label}
                  isValidConnection={isValidConnection}
                />
              )}
            </Box>
          );
        })}
        {_.map(outputs, (output, key) => {
          const { dataType, label } = output;
          return (
            <Flex
              key={key}
              position={'relative'}
              width={'100%'}
              justifyContent={'flex-end'}
              alignItems={'center'}
            >
              <Text>{label}</Text>
              <ModuleHandle
                handleType={'source'}
                id={key}
                dataType={dataType}
                label={label}
                isValidConnection={isValidConnection}
              />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default ModuleUIBuilder;
