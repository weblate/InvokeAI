import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { Connection, Node, NodeProps, useNodes } from 'react-flow-renderer';
import ImageUploadParameter from './components/ImageUploadParameter';
import ModuleHandle from './components/ModuleHandle';
import NumberParameter from './components/NumberParameter';
import SelectParameter from './components/SelectParameter';
import SliderParameter from './components/SliderParameter';
import TextareaParameter from './components/TextareaParameter';
import TextParameter from './components/TextParameter';
import ToggleParameter from './components/ToggleParameter';
import { Module } from './types';

function ModuleUIBuilder(props: NodeProps<Module>) {
  const moduleBgColor = useColorModeValue('white', 'gray.800');
  const headerBgColor = useColorModeValue('gray.100', 'gray.700');
  const headerSelectedBgColor = useColorModeValue('blue.100', 'blue.700');
  const moduleSelectedBorderColor = useColorModeValue('blue.200', 'blue.800');
  const { id, data, selected } = props;
  const { moduleName, parameters, nodeInputs, nodeOutputs } = data;

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
          sourceNode.data.nodeOutputs[connection.sourceHandle].kind ===
          targetNode.data.nodeInputs[connection.targetHandle].kind
        );
      }
      return false;
    },
    [nodes]
  );

  useEffect(() => {
    console.log(nodes);
  }, [nodes]);

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
        {(Object.keys(parameters) as Array<keyof typeof parameters>).map(
          (p, i) => {
            const parameter = parameters[p];
            const { kind } = parameter;
            switch (kind) {
              case 'text':
                return (
                  <TextParameter key={i} moduleId={id} parameter={parameter} />
                );
              case 'textarea':
                return (
                  <TextareaParameter
                    key={i}
                    moduleId={id}
                    parameter={parameter}
                  />
                );
              case 'select':
                return (
                  <SelectParameter
                    key={i}
                    moduleId={id}
                    parameter={parameter}
                  />
                );
              case 'slider':
                return (
                  <SliderParameter
                    key={i}
                    moduleId={id}
                    parameter={parameter}
                  />
                );
              case 'number':
                return (
                  <NumberParameter
                    key={i}
                    moduleId={id}
                    parameter={parameter}
                  />
                );
              case 'toggle':
                return (
                  <ToggleParameter
                    key={i}
                    moduleId={id}
                    parameter={parameter}
                  />
                );
              case 'imageUpload':
                return (
                  <ImageUploadParameter
                    key={i}
                    moduleId={id}
                    parameter={parameter}
                  />
                );
            }
          }
        )}
        {nodeInputs &&
          (Object.keys(nodeInputs) as Array<keyof typeof nodeInputs>).map(
            (key, i) => {
              const input = nodeInputs[key];
              return (
                <ModuleHandle
                  key={i}
                  type={'target'}
                  inputOutput={input}
                  isValidConnection={isValidConnection}
                  offset={`${
                    (1 / (Object.keys(nodeInputs).length + 1)) * (i + 1) * 100
                  }%`}
                />
              );
            }
          )}
        {nodeOutputs &&
          (Object.keys(nodeOutputs) as Array<keyof typeof nodeOutputs>).map(
            (key, i) => {
              const output = nodeOutputs[key];
              return (
                <ModuleHandle
                  key={i}
                  type={'source'}
                  inputOutput={output}
                  isValidConnection={isValidConnection}
                  offset={`${
                    (1 / (Object.keys(nodeOutputs).length + 1)) * (i + 1) * 100
                  }%`}
                />
              );
            }
          )}
      </Flex>
    </Flex>
  );
}

export default ModuleUIBuilder;
