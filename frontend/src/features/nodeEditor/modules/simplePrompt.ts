import { Module } from '../types';
import { v4 as uuidv4 } from 'uuid';

const makeSimplePromptModule = (): Module => {
  return {
    moduleId: uuidv4(),
    moduleType: 'simple_prompt',
    moduleLabel: 'Simple Prompt',
    parameters: {
      prompt: {
        id: 'prompt',
        label: 'Prompt',
        uiType: 'textarea',
        dataType: 'string',
        value: 'This is a test prompt',
        connectable: ['source'],
        labelPosition: 'top',
      },
    },
  };
};

export default makeSimplePromptModule;
