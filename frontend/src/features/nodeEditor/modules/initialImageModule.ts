import { Module, ModuleTypes, OutputKinds } from '../types';

const initialImageModule: Module = {
  moduleType: ModuleTypes.InitialImage,
  nodeOutputs: {
    initialImage: {
      id: 'initialImage',
      label: 'Image Out',
      kind: OutputKinds.Image,
      value: 'image',
    },
  },
  moduleName: 'Initial Image',
  parameters: {
    initialImage: {
      id: 'initialImage',
      kind: 'imageUpload',
      value: undefined,
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

export default initialImageModule;
