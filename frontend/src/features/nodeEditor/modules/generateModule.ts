import {
  HEIGHTS,
  NUMPY_RAND_MAX,
  NUMPY_RAND_MIN,
  SAMPLERS,
  WIDTHS,
} from '../../../app/constants';
import { InputKinds, Module, ModuleTypes, OutputKinds } from '../types';

const generateModule: Module = {
  moduleType: ModuleTypes.Generate,
  nodeInputs: {
    prompt: {
      id: 'prompt',
      label: 'Prompt In',
      kind: InputKinds.Text,
      value: 'prompt',
    },
    initialImage: {
      id: 'initialImage',
      label: 'Initial Image In',
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
  moduleName: 'Generate',
  parameters: {
    sampler: {
      id: 'sampler',
      label: 'Sampler',
      kind: 'select',
      value: 'k_lms',
      options: SAMPLERS,
    },
    seed: {
      id: 'seed',
      label: 'Seed',
      kind: 'number',
      min: NUMPY_RAND_MIN,
      max: NUMPY_RAND_MAX,
      step: 1,
      value: 12345,
      withRandomizeIconButton: true,
    },
    steps: {
      id: 'steps',
      label: 'Steps',
      kind: 'slider',
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
      kind: 'slider',
      value: 7.5,
      min: 0,
      max: 10,
      step: 0.1,
      withNumberInput: true,
    },
    width: {
      id: 'width',
      label: 'Width',
      kind: 'select',
      value: 512,
      options: WIDTHS,
    },
    height: {
      id: 'height',
      label: 'Height',
      kind: 'select',
      value: 512,
      options: HEIGHTS,
    },
    seamless: {
      id: 'seamless',
      label: 'Seamless',
      kind: 'toggle',
      value: false,
    },
  },
};

export default generateModule;
