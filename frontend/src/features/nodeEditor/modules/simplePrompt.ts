import { Invocation } from '../types';
import { v4 as uuidv4 } from 'uuid';

const makeSimplePromptModule = (): Invocation => {
  return {
    moduleId: uuidv4(),
    moduleType: 'simple_prompt',
    moduleLabel: 'Simple Prompt',
    fields: {
      prompt: {
        label: 'Prompt',
        uiType: 'textarea',
        dataType: 'string',
        value: 'This is a test prompt',
        labelPosition: 'top',
      },
    },
    outputs: {
      prompt: {
        dataType: 'string',
        label: 'Prompt',
        nextTo: 'prompt',
      },
    },
  };
};

export default makeSimplePromptModule;
