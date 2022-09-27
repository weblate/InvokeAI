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
        type: 'string',
        value: 'This is a test prompt',
        ui: {
          type: 'textarea',
          label_position: 'top',
        },
      },
    },
    outputs: {
      prompt: {
        type: 'string',
        label: 'Prompt',
        ui: { next_to: 'prompt' },
      },
    },
  };
};

export default makeSimplePromptModule;
