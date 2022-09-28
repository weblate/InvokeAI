import {
  HEIGHTS,
  NUMPY_RAND_MAX,
  NUMPY_RAND_MIN,
  SAMPLERS,
  WIDTHS,
} from '../../../app/constants';
import { Invocation } from '../types';
import { v4 as uuidv4 } from 'uuid';

const makeGenerateModule = (): Invocation => {
  return {
    moduleId: uuidv4(),
    moduleType: 'generate',
    moduleLabel: 'Generate',
    fields: {
      prompt: {
        label: 'Prompt',
        uiType: 'text',
        type: 'string',
        requiresConnection: true,
      },
      image: {
        label: 'Initial image',
        uiType: 'image',
        type: 'image',
        requiresConnection: true,
        optional: true,
      },
      strength: {
        label: 'Initial image strength',
        uiType: 'slider',
        type: 'number',
        min: 0,
        max: 1,
        value: 0.75,
        step: 0.01,
        dependsOn: 'input_image',
        withNumberInput: true,
      },
      sampler_name: {
        label: 'Sampler',
        uiType: 'select',
        type: 'string',
        value: 'k_lms',
        options: SAMPLERS,
      },
      seed: {
        label: 'Seed',
        uiType: 'numberInput',
        type: 'number',
        min: NUMPY_RAND_MIN,
        max: NUMPY_RAND_MAX,
        step: 1,
        value: 12345,
        withRandomizeIconButton: true,
      },
      steps: {
        label: 'Steps',
        uiType: 'slider',
        type: 'number',
        value: 32,
        min: 1,
        max: 200,
        step: 1,
        withNumberInput: true,
        numberInputMax: Infinity,
      },
      cfg_scale: {
        label: 'CFG Scale',
        uiType: 'slider',
        type: 'number',
        value: 7.5,
        min: 0,
        max: 10,
        step: 0.1,
        exclusiveMinimum: true,
        withNumberInput: true,
      },
      width: {
        label: 'Width',
        uiType: 'select',
        type: 'number',
        value: 512,
        options: WIDTHS,
      },
      height: {
        label: 'Height',
        uiType: 'select',
        type: 'number',
        value: 512,
        options: HEIGHTS,
      },
      seamless: {
        label: 'Seamless',
        uiType: 'toggle',
        type: 'boolean',
        value: false,
      },
    },
    outputs: {
      image: {
        label: 'Output image',
        type: 'image',
      },
    },
  };
};

export default makeGenerateModule;
