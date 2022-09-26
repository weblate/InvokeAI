import { Module } from '../types';
import { v4 as uuidv4 } from 'uuid';

const makeUpscaleModule = (): Module => {
  return {
    moduleId: uuidv4(),
    moduleType: 'upscale',
    moduleLabel: 'Upscale Image',
    parameters: {
      inputImage: {
        id: 'inputImage',
        label: 'Input image',
        uiType: 'image',
        dataType: 'image',
        value: '',
        connectable: ['target'],
      },
      level: {
        id: 'level',
        label: 'Level',
        uiType: 'select',
        dataType: 'number',
        value: 4,
        options: [2, 4],
      },
      strength: {
        id: 'strength',
        label: 'Strength',
        dataType: 'number',
        uiType: 'slider',
        value: 0.7,
        min: 0,
        max: 1,
        step: 0.01,
        withNumberInput: true,
      },
      outputImage: {
        id: 'outputImage',
        label: 'Output image',
        uiType: 'image',
        dataType: 'image',
        value: '',
        connectable: ['source'],
      },
    },
  };
};

export default makeUpscaleModule;
