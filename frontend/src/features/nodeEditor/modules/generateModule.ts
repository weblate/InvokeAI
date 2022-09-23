import {
  HEIGHTS,
  NUMPY_RAND_MAX,
  NUMPY_RAND_MIN,
  SAMPLERS,
  WIDTHS,
} from '../../../app/constants';
import { InputTypes, Module, ModuleTypes, OutputTypes } from '../types';

const generateModule: Module = {
  moduleType: ModuleTypes.Generate,
  nodeInputs: [
    {
      id: 'prompt',
      label: 'Prompt In',
      type: InputTypes.Text,
      value: 'prompt',
    },
    {
      id: 'initialImage',
      label: 'Initial Image In',
      type: InputTypes.Image,
      value: 'initialImage',
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
  moduleName: 'Generate',
  parameters: [
    {
      name: 'sampler',
      label: 'Sampler',
      kind: 'select',
      value: 'k_lms',
      options: SAMPLERS,
    },
    {
      name: 'seed',
      label: 'Seed',
      kind: 'number',
      min: NUMPY_RAND_MIN,
      max: NUMPY_RAND_MAX,
      step: 1,
      value: 12345,
      withRandomizeButton: true,
    },
    {
      name: 'steps',
      label: 'Steps',
      kind: 'slider',
      value: 32,
      min: 0,
      max: 200,
      step: 1,
    },
    {
      name: 'cfgScale',
      label: 'CFG Scale',
      kind: 'slider',
      value: 7.5,
      min: 0,
      max: 10,
      step: 0.1,
    },
    {
      name: 'width',
      label: 'Width',
      kind: 'select',
      value: 512,
      options: WIDTHS,
    },
    {
      name: 'height',
      label: 'Height',
      kind: 'select',
      value: 512,
      options: HEIGHTS,
    },
    {
      name: 'seamless',
      label: 'Seamless',
      kind: 'toggle',
      value: false,
    },
  ],
};

export default generateModule;
