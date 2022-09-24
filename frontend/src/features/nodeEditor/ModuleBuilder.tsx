import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import _ from 'lodash';
import { ReactNode, useCallback, useEffect } from 'react';
import { Connection, Node, NodeProps, useNodes } from 'react-flow-renderer';
import ImageUploadParameter from './components/ImageUploadParameter';
import ModuleHandle from './components/ModuleHandle';
import NumberParameter from './components/NumberParameter';
import SelectParameter from './components/SelectParameter';
import SliderParameter from './components/SliderParameter';
import TextareaParameter from './components/TextareaParameter';
import TextParameter from './components/TextParameter';
import ToggleParameter from './components/ToggleParameter';
import { Connectable, Module, ModuleParameter } from './types';

const makeParameter = (
  parameter: ModuleParameter,
  moduleId: string
): ReactNode => {
  const { id, type, label, connectable } = parameter;

  switch (type) {
    case 'text':
      return (
        <TextParameter key={id} moduleId={moduleId} parameter={parameter} />
      );
    case 'textarea':
      return (
        <TextareaParameter key={id} moduleId={moduleId} parameter={parameter} />
      );
    case 'select':
      return (
        <SelectParameter key={id} moduleId={moduleId} parameter={parameter} />
      );
    case 'slider':
      return (
        <SliderParameter key={id} moduleId={moduleId} parameter={parameter} />
      );
    case 'number':
      return (
        <NumberParameter key={id} moduleId={moduleId} parameter={parameter} />
      );
    case 'toggle':
      return (
        <ToggleParameter key={id} moduleId={moduleId} parameter={parameter} />
      );
    case 'imageUpload':
      return (
        <ImageUploadParameter
          key={id}
          moduleId={moduleId}
          parameter={parameter}
        />
      );
  }
};

function ModuleUIBuilder(props: NodeProps<Module>) {
  const moduleBgColor = useColorModeValue('white', 'gray.800');
  const headerBgColor = useColorModeValue('gray.100', 'gray.700');
  const headerSelectedBgColor = useColorModeValue('blue.100', 'blue.700');
  const moduleSelectedBorderColor = useColorModeValue('blue.200', 'blue.800');

  const nodes = useNodes();

  const isValidConnection = useCallback(
    (connection: Connection) => {
      const sourceNode: Node | undefined = nodes.find(
        (n) => n.id === connection.source
      );
      const targetNode: Node | undefined = nodes.find(
        (n) => n.id === connection.target
      );
      if (
        sourceNode &&
        targetNode &&
        connection.sourceHandle &&
        connection.targetHandle
      ) {
        return (
          sourceNode.data.parameters[connection.sourceHandle].type ===
          targetNode.data.parameters[connection.targetHandle].type
        );
      }
      return false;
    },
    [nodes]
  );

  const { id: moduleId, data, selected } = props;
  const { moduleName, parameters } = data;

  // const inputs = _.filter(
  //   parameters,
  //   (parameter) => parameter.connectable === Connectable.Input
  // );

  // const outputs = _.filter(
  //   parameters,
  //   (parameter) => parameter.connectable === Connectable.Output
  // );

  return (
    <Flex
      borderWidth={1}
      rounded={'md'}
      direction={'column'}
      gap={2}
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
        <Heading size={'sm'}>{moduleName}</Heading>
      </Flex>
      <Flex direction={'column'} gap={2} cursor={'initial'} p={2}>
        {_.map(parameters, (parameter, i) => {
          const { id, type, label, connectable } = parameter;
          return (
            <Box key={i} position={'relative'} width={'100%'}>
              {makeParameter(parameter, moduleId)}
              {connectable && (
                <ModuleHandle
                  handleType={connectable}
                  id={id}
                  type={type}
                  label={label}
                  isValidConnection={isValidConnection}
                />
              )}
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default ModuleUIBuilder;
