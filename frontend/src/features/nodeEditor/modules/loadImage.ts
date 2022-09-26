import { Invocation } from '../types';
import { v4 as uuidv4 } from 'uuid';

const makeLoadImageModule = (): Invocation => {
  return {
    moduleId: uuidv4(),
    moduleType: 'load_image',
    moduleLabel: 'Load Image',
    fields: {
      image: {
        label: 'Image',
        uiType: 'image',
        dataType: 'image',
        value: 'outputs/test.png',
        labelPosition: 'top',
      },
    },
    outputs: {
      image: {
        label: 'Output image',
        dataType: 'image',
        nextTo: 'image',
      },
    },
  };
};

export default makeLoadImageModule;
