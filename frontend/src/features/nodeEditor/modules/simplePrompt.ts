import { Connectable, Module, ModuleTypes } from '../types';

const simplePromptModule: Module = {
  moduleType: ModuleTypes.SimplePrompt,
  moduleName: 'Simple Prompt',
  parameters: {
    prompt: {
      id: 'prompt',
      type: 'textarea',
      label: 'Prompt',
      value: 'This is a test prompt',
      connectable: Connectable.Source,
    },
  },
};

export default simplePromptModule;
