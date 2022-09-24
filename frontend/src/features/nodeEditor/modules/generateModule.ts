import {
  HEIGHTS,
  NUMPY_RAND_MAX,
  NUMPY_RAND_MIN,
  SAMPLERS,
  WIDTHS,
} from '../../../app/constants';
import { Connectable, Module, ModuleTypes } from '../types';

const generateModule: Module = {
  moduleType: ModuleTypes.Generate,
  moduleName: 'Generate',
  parameters: {
    inputPrompt: {
      id: 'inputPrompt',
      label: 'Prompt',
      type: 'text',
      value: '',
      connectable: Connectable.Target,
    },
    initialImage: {
      id: 'initialImage',
      label: 'Initial Image',
      type: 'image',
      value: '',
      connectable: Connectable.Target,
    },
    outputImage: {
      id: 'outputImage',
      label: 'Output Image',
      type: 'image',
      value: '',
      connectable: Connectable.Source,
    },
    sampler: {
      id: 'sampler',
      label: 'Sampler',
      type: 'select',
      value: 'k_lms',
      options: SAMPLERS,
    },
    seed: {
      id: 'seed',
      label: 'Seed',
      type: 'number',
      min: NUMPY_RAND_MIN,
      max: NUMPY_RAND_MAX,
      step: 1,
      value: 12345,
      withRandomizeIconButton: true,
    },
    steps: {
      id: 'steps',
      label: 'Steps',
      type: 'slider',
      value: 32,
      min: 0,
      max: 200,
      step: 1,
      withNumberInput: true,
      numberInputMax: Infinity,
    },
    cfgScale: {
      id: 'cfgScale',
      label: 'CFG Scale',
      type: 'slider',
      value: 7.5,
      min: 0,
      max: 10,
      step: 0.1,
      withNumberInput: true,
    },
    width: {
      id: 'width',
      label: 'Width',
      type: 'select',
      value: 512,
      options: WIDTHS,
    },
    height: {
      id: 'height',
      label: 'Height',
      type: 'select',
      value: 512,
      options: HEIGHTS,
    },
    seamless: {
      id: 'seamless',
      label: 'Seamless',
      type: 'toggle',
      value: false,
    },
  },
};

export default generateModule;
