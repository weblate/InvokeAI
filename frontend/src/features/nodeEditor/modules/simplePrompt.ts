import { Module, ModuleTypes, OutputKinds } from '../types';

const simplePromptModule: Module = {
  moduleType: ModuleTypes.SimplePrompt,
  nodeOutputs: {
    prompt: {
      id: 'prompt',
      label: 'Prompt Out',
      kind: OutputKinds.Text,
      value: 'prompt',
    },
  },
  moduleName: 'Simple Prompt',
  parameters: {
    prompt: {
      id: 'prompt',
      kind: 'textarea',
      value: 'This is a test prompt',
    },
  },
};

export default simplePromptModule;
