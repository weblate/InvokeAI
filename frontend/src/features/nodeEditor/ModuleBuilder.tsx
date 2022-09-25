import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import _ from 'lodash';
import { ReactNode, useCallback } from 'react';
import {
  Connection,
  Node,
  NodeProps,
  useEdges,
  useNodes,
} from 'react-flow-renderer';
import ImageParameter from './components/ImageParameter';
import ModuleHandle from './components/ModuleHandle';
import NumberParameter from './components/NumberParameter';
import SelectParameter from './components/SelectParameter';
import SliderParameter from './components/SliderParameter';
import TextareaParameter from './components/TextareaParameter';
import TextParameter from './components/TextParameter';
import ToggleParameter from './components/ToggleParameter';
import { Module, ModuleParameter } from './types';

type ParameterMakerProps = {
  parameter: ModuleParameter;
  moduleId: string;
  isDisabled: boolean;
};

// TODO: refactor this whole thing
const ParameterMaker = ({
  parameter,
  moduleId,
  isDisabled,
}: ParameterMakerProps) => {
  const { id, uiType, connectable } = parameter;

  switch (uiType) {
    case 'text':
      return (
        <TextParameter
          key={id}
          moduleId={moduleId}
          parameter={parameter}
          isDisabled={isDisabled}
        />
      );
    case 'textarea':
      return (
        <TextareaParameter
          key={id}
          moduleId={moduleId}
          parameter={parameter}
          isDisabled={isDisabled}
        />
      );
    case 'select':
      return (
        <SelectParameter
          key={id}
          moduleId={moduleId}
          parameter={parameter}
          isDisabled={isDisabled}
        />
      );
    case 'slider':
      return (
        <SliderParameter
          key={id}
          moduleId={moduleId}
          parameter={parameter}
          isDisabled={isDisabled}
        />
      );
    case 'numberInput':
      return (
        <NumberParameter
          key={id}
          moduleId={moduleId}
          parameter={parameter}
          isDisabled={isDisabled}
        />
      );
    case 'toggle':
      return (
        <ToggleParameter
          key={id}
          moduleId={moduleId}
          parameter={parameter}
          isDisabled={isDisabled}
        />
      );
    case 'image':
      return (
        <ImageParameter
          key={id}
          moduleId={moduleId}
          parameter={parameter}
          isDisabled={isDisabled}
        />
      );
    default:
      return <></>;
  }
};

function ModuleUIBuilder(props: NodeProps<Module>) {
  const { id: moduleId, data, selected } = props;
  const { moduleLabel, parameters } = data;

  const moduleBgColor = useColorModeValue('white', 'gray.800');
  const headerBgColor = useColorModeValue('gray.100', 'gray.700');
  const headerSelectedBgColor = useColorModeValue('blue.100', 'blue.700');
  const moduleSelectedBorderColor = useColorModeValue('blue.200', 'blue.800');

  const nodes = useNodes();
  const edges = useEdges();

  // Check if an in-progress connection is valid
  const isValidConnection = useCallback(
    (connection: Connection): boolean => {
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
      const sourceNode: Node | undefined = nodes.find(
        (n) => n.id === connection.source
      );

      const targetNode: Node | undefined = nodes.find(
        (n) => n.id === connection.target
      );

      // Conditional guards against undefined nodes/handles
      if (
        sourceNode &&
        targetNode &&
        connection.sourceHandle &&
        connection.targetHandle
      ) {
        // connection dataTypes must be the same for a connection
        return (
          sourceNode.data.parameters[connection.sourceHandle].dataType ===
          targetNode.data.parameters[connection.targetHandle].dataType
        );
      }

      // Default to invalid
      return false;
    },
    [nodes, edges]
  );

  return (
    <Flex
      borderWidth={1}
      rounded={'md'}
      direction={'column'}
      cursor={'initial'}
      minWidth={'300px'}
      backgroundColor={moduleBgColor}
      borderColor={selected ? moduleSelectedBorderColor : undefined}
    >
      <Flex
        className={'node-drag-handle'}
        cursor={'move'}
        backgroundColor={selected ? headerSelectedBgColor : headerBgColor}
        borderTopRadius={'md'}
        p={2}
      >
        <Heading size={'sm'}>{moduleLabel}</Heading>
      </Flex>
      <Flex direction={'column'} gap={2} cursor={'initial'} p={2}>
        {_.map(parameters, (parameter, i) => {
          const { id, dataType, label, connectable } = parameter;
          const isDependsOnConnected = parameter.dependsOn
            ? Boolean(
                edges.find(
                  (edge) =>
                    edge.target === moduleId &&
                    edge.targetHandle ===
                      parameters[parameter.dependsOn as keyof ModuleParameter]
                        .id
                )
              )
            : true;
          return (
            <Box key={i} position={'relative'} width={'100%'}>
              <ParameterMaker
                parameter={parameter}
                moduleId={moduleId}
                isDisabled={!isDependsOnConnected}
              />
              {connectable &&
                connectable.map((c, i) => {
                  return (
                    <ModuleHandle
                      key={i}
                      handleType={c}
                      id={id}
                      dataType={dataType}
                      label={label}
                      isValidConnection={isValidConnection}
                    />
                  );
                })}
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default ModuleUIBuilder;
