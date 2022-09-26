import {
  Button,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { FaRandom } from 'react-icons/fa';
import { useAppDispatch } from '../../../app/store';
import randomInt from '../../../common/util/randomInt';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { NumberField } from '../types';

type NumberFieldComponentProps = {
  moduleId: string;
  field: NumberField;
  fieldId: string;
};

const NumberFieldComponent = ({ moduleId, field, fieldId }: NumberFieldComponentProps) => {
  const dispatch = useAppDispatch();
  const {
    value,
    label,
    min,
    max,
    step,
    withRandomizeButton,
    withRandomizeIconButton,
    withSteppers,
  } = field;

  const handleOnChange = (v: string | number) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        fieldId,
        value: Number(v),
      })
    );

  const handleOnClickRandomize = () => {
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        fieldId,
        value: randomInt(min, max),
      })
    );
  };

  return (
    <>
      <NumberInput
        onChange={handleOnChange}
        min={min}
        max={max}
        step={step}
        value={value}
        size={'sm'}
      >
        <NumberInputField />
        {withSteppers && (
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        )}
      </NumberInput>
      {withRandomizeButton && (
        <Button size={'sm'} onClick={handleOnClickRandomize}>
          Randomize
        </Button>
      )}
      {withRandomizeIconButton && (
        <IconButton
          aria-label={`Randomize ${label}`}
          icon={<FaRandom />}
          size={'sm'}
          fontSize={'md'}
          onClick={handleOnClickRandomize}
        />
      )}
    </>
  );
};

export default NumberFieldComponent;
