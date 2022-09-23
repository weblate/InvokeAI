import { Module, ModuleTypes, OutputTypes } from '../types';

const simplePromptModule: Module = {
  moduleType: ModuleTypes.SimplePrompt,
  nodeOutputs: [
    {
      id: 'prompt',
      label: 'Prompt Out',
      type: OutputTypes.Text,
      value: 'prompt',
    },
  ],
  moduleName: 'Simple Prompt',
  parameters: [
    {
      name: 'prompt',
      kind: 'textarea',
      value: 'This is a test prompt',
    },
  ],
};

export default simplePromptModule;
