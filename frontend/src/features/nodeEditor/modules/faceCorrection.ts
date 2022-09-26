import { Invocation } from '../types';
import { v4 as uuidv4 } from 'uuid';

const makeFaceCorrectionModule = (): Invocation => {
  return {
    moduleId: uuidv4(),
    moduleType: 'restore_face',
    moduleLabel: 'Face Correction',
    fields: {
      image: {
        label: 'Input image',
        uiType: 'image',
        dataType: 'image',
        value: '',
        requiresConnection: true,
      },
      strength: {
        label: 'Strength',
        dataType: 'number',
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
        dataType: 'image',
      },
    },
  };
};

export default makeFaceCorrectionModule;
