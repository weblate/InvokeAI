import { Module } from '../types';
import { v4 as uuidv4 } from 'uuid';

const makeInitialImageModule = (): Module => {
  return {
    moduleId: uuidv4(),
    moduleType: 'initialImage',
    moduleLabel: 'Initial Image',
    parameters: {
      initialImage: {
        id: 'initialImage',
        label: 'Initial Image',
        uiType: 'image',
        dataType: 'image',
        value: '',
        connectable: ['source'],
      },
      strength: {
        id: 'strength',
        label: 'Strength',
        uiType: 'slider',
        dataType: 'number',
        value: 0.7,
        min: 0,
        max: 1,
        step: 0.01,
        withNumberInput: true,
      },
    },
  };
};

export default makeInitialImageModule;
