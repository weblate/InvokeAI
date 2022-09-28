import { Invocation } from '../types';
import { v4 as uuidv4 } from 'uuid';

const makeShowImageModule = (): Invocation => {
  return {
    moduleId: uuidv4(),
    moduleType: 'show_image',
    moduleLabel: 'Show Image',
    fields: {
      image: {
        label: 'Image',
        uiType: 'image',
        type: 'image',
        labelPosition: 'top',
        requiresConnection: true,
      },
    },
    outputs: {
      image: {
        type: 'image',
        label: 'Image pass-through',
        nextTo: 'image',
      },
    },
  };
};

export default makeShowImageModule;
