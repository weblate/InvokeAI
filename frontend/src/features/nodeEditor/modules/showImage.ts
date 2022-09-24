import { Module } from '../types';
import { v4 as uuidv4 } from 'uuid';

const makeShowImageModule = (): Module => {
  return {
    moduleId: uuidv4(),
    moduleType: 'showImage',
    moduleLabel: 'Show Image',
    parameters: {
      image: {
        id: 'image',
        label: 'Image',
        uiType: 'image',
        dataType: 'image',
        value: '',
        connectable: ['target', 'source'],
        labelPosition: 'top',
      },
    },
  };
};

export default makeShowImageModule;
