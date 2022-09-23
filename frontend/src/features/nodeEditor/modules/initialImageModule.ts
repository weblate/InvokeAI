import { Module, ModuleTypes, OutputKinds } from '../types';

const initialImageModule: Module = {
  moduleType: ModuleTypes.InitialImage,
  nodeOutputs: [
    {
      id: 'initialImage',
      label: 'Image Out',
      kind: OutputKinds.Image,
      value: 'initialImage',
    },
  ],
  moduleName: 'Initial Image',
  parameters: [
    {
      name: 'initialImage',
      kind: 'imageUpload',
      value: undefined,
    },
    {
      name: 'strength',
      label: 'Strength',
      kind: 'slider',
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.01,
      withNumberInput: true,
    },
  ],
};

export default initialImageModule;
