import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Connection, NodeProps } from 'react-flow-renderer';
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
  const { id, data } = props;
  const { moduleName, parameters, nodeInputs, nodeOutputs } = data;

  const isValidConnection = useCallback((connection: Connection) => {
    return connection.sourceHandle === connection.targetHandle;
  }, []);

  return (
    <Flex
      borderWidth={1}
      rounded={'md'}
      direction={'column'}
      gap={2}
      cursor={'initial'}
      minWidth={'300px'}
      backgroundColor={moduleBgColor}
    >
      <Flex
        className={'node-drag-handle'}
        cursor={'move'}
        backgroundColor={headerBgColor}
        p={2}
      >
        <Heading size={'sm'}>{moduleName}</Heading>
      </Flex>
      <Flex direction={'column'} gap={2} cursor={'initial'} p={2}>
        {parameters.map((parameter, i) => {
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
                <SelectParameter key={i} moduleId={id} parameter={parameter} />
              );
            case 'slider':
              return (
                <SliderParameter key={i} moduleId={id} parameter={parameter} />
              );
            case 'number':
              return (
                <NumberParameter key={i} moduleId={id} parameter={parameter} />
              );
            case 'toggle':
              return (
                <ToggleParameter key={i} moduleId={id} parameter={parameter} />
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
        })}
        {nodeInputs &&
          nodeInputs.map((input, i) => {
            return (
              <ModuleHandle
                key={i}
                type={'target'}
                inputOutput={input}
                isValidConnection={isValidConnection}
                offset={`${(1 / (nodeInputs.length + 1)) * (i + 1) * 100}%`}
              />
            );
          })}
        {nodeOutputs &&
          nodeOutputs.map((output, i) => {
            return (
              <ModuleHandle
                key={i}
                type={'source'}
                inputOutput={output}
                isValidConnection={isValidConnection}
                offset={`${(1 / (nodeOutputs.length + 1)) * (i + 1) * 100}%`}
              />
            );
          })}
      </Flex>
    </Flex>
  );
}

export default ModuleUIBuilder;
