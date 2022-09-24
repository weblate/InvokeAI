import { Connectable, Module, ModuleTypes } from '../types';

const initialImageModule: Module = {
  moduleType: ModuleTypes.InitialImage,
  moduleName: 'Initial Image',
  parameters: {
    initialImage: {
      id: 'initialImage',
      label: 'Initial Image',
      type: 'imageUpload',
      value: undefined,
      connectable: Connectable.Source,
    },
    strength: {
      id: 'strength',
      label: 'Strength',
      type: 'slider',
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.01,
      withNumberInput: true,
    },
  },
};

export default initialImageModule;
