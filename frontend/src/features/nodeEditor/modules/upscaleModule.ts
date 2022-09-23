import { InputKinds, Module, ModuleTypes, OutputKinds } from '../types';

const upscaleModule: Module = {
  moduleType: ModuleTypes.Upscale,
  nodeInputs: {
    image: {
      id: 'image',
      label: 'Image In',
      kind: InputKinds.Image,
      value: 'image',
    },
  },
  nodeOutputs: {
      image: {
        id: 'image',
        label: 'Image Out',
        kind: OutputKinds.Image,
        value: 'image',
      },
    },
  moduleName: 'Upscale Image',
  parameters: {
    scale: {
      id: 'scale',
      label: 'Scale',
      kind: 'select',
      value: 4,
      options: [2, 4],
    },
    strength: {
      id: 'strength',
      label: 'Strength',
      kind: 'slider',
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.01,
      withNumberInput: true,
    },
  },
};

export default upscaleModule;
