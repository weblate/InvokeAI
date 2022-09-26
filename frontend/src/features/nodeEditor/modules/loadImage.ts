import { Module } from '../types';
import { v4 as uuidv4 } from 'uuid';

const makeLoadImageModule = (): Module => {
  return {
    moduleId: uuidv4(),
    moduleType: 'load_image',
    moduleLabel: 'Load Image',
    parameters: {
      image: {
        id: 'image',
        label: 'Image',
        uiType: 'image',
        dataType: 'image',
        value: 'outputs/test.png',
        connectable: ['source'],
        labelPosition: 'top',
      },
    },
  };
};

export default makeLoadImageModule;
