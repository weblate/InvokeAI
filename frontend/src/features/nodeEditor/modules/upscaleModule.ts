import { Invocation } from '../types';
import { v4 as uuidv4 } from 'uuid';

const makeUpscaleModule = (): Invocation => {
  return {
    moduleId: uuidv4(),
    moduleType: 'upscale',
    moduleLabel: 'Upscale Image',
    fields: {
      image: {
        label: 'Input image',
        uiType: 'image',
        type: 'image',
        requiresConnection: true,
      },
      level: {
        label: 'Level',
        uiType: 'select',
        type: 'number',
        value: 4,
        options: [2, 4],
      },
      strength: {
        label: 'Strength',
        type: 'number',
        uiType: 'slider',
        value: 0.7,
        min: 0,
        max: 1,
        step: 0.01,
        withNumberInput: true,
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

export default makeUpscaleModule;
