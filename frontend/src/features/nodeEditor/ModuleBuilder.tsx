import { Flex, Heading, Tooltip } from '@chakra-ui/react';
import { useCallback } from 'react';
import { Connection, Handle, NodeProps, Position } from 'react-flow-renderer';
import ImageUploadParameter from './components/ImageUploadParameter';
import NumberParameter from './components/NumberParameter';
import SelectParameter from './components/SelectParameter';
import SliderParameter from './components/SliderParameter';
import TextareaParameter from './components/TextareaParameter';
import TextParameter from './components/TextParameter';
import ToggleParameter from './components/ToggleParameter';
import { Module } from './types';

const edgeColors = {
  TEXT: 'green',
  IMAGE: 'blue',
};

function ModuleUIBuilder(props: NodeProps<Module>) {
  const { id, data } = props;
  const { moduleName, parameters, nodeInputs, nodeOutputs } = data;

  const isValidConnection = useCallback((connection: Connection) => {
    return connection.sourceHandle === connection.targetHandle;
  }, []);

  return (
    <Flex
      borderWidth={1}
      p={2}
      rounded={'md'}
      direction={'column'}
      gap={2}
      cursor={'initial'}
      minWidth={'300px'}
    >
      <Heading size={'sm'} className={'node-drag-handle'} cursor={'move'}>
        {moduleName}
      </Heading>
      {parameters.map((parameter, i) => {
        const { kind } = parameter;
        switch (kind) {
          case 'text':
            return (
              <TextParameter key={i} moduleId={id} parameter={parameter} />
            );
          case 'textarea':
            return (
              <TextareaParameter key={i} moduleId={id} parameter={parameter} />
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
          const { id, label, type, value } = input;

          return (
            <Tooltip key={i} label={label}>
              <Handle
                type={'target'}
                position={Position.Left}
                id={id}
                style={{
                  top: `${(1 / (nodeInputs.length + 1)) * (i + 1) * 100}%`,
                  width: '1rem',
                  height: '1rem',
                  left: '-1rem',
                  background: edgeColors[type],
                }}
                isValidConnection={isValidConnection}
              />
            </Tooltip>
          );
        })}
      {nodeOutputs &&
        nodeOutputs.map((output, i) => {
          const { id, label, type, value } = output;
          return (
            <Tooltip key={i} label={label}>
              <Handle
                type={'source'}
                position={Position.Right}
                id={id}
                style={{
                  bottom: `${(1 / (nodeOutputs.length + 1)) * (i + 1) * 100}%`,
                  width: '1rem',
                  height: '1rem',
                  right: '-1rem',
                  background: edgeColors[type],
                }}
                isValidConnection={isValidConnection}
              />
            </Tooltip>
          );
        })}
    </Flex>
  );
}

export default ModuleUIBuilder;
