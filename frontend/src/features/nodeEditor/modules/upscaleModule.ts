import { InputTypes, Module, ModuleTypes, OutputTypes } from '../types';

const upscaleModule: Module = {
  moduleType: ModuleTypes.Upscale,
  nodeInputs: [
    {
      id: 'image',
      label: 'Image In',
      type: InputTypes.Image,
      value: 'image',
    },
  ],
  nodeOutputs: [
    {
      id: 'image',
      label: 'Image Out',
      type: OutputTypes.Image,
      value: 'image',
    },
  ],
  moduleName: 'Upscale Image',
  parameters: [
    {
      name: 'scale',
      label: 'Scale',
      kind: 'select',
      value: 4,
      options: [2, 4],
    },
    {
      name: 'strength',
      label: 'Strength',
      kind: 'slider',
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.01,
    },
  ],
};

export default upscaleModule;
