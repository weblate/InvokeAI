import { Connectable, Module, ModuleTypes } from '../types';

const upscaleModule: Module = {
  moduleType: ModuleTypes.Upscale,
  moduleName: 'Upscale Image',
  parameters: {
    inputImage: {
      id: 'inputImage',
      label: 'Image In',
      type: 'image',
      value: '',
      connectable: Connectable.Target,
    },
    outputImage: {
      id: 'outputImage',
      label: 'Image Out',
      type: 'image',
      value: '',
      connectable: Connectable.Source,
    },
    scale: {
      id: 'scale',
      label: 'Scale',
      type: 'select',
      value: 4,
      options: [2, 4],
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

export default upscaleModule;
