import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { NumberModuleParameter } from '../types';
import ParameterLabel from './ParameterLabel';

type NumberParameterProps = {
  moduleId: string;
  parameter: NumberModuleParameter;
};

const NumberParameter = ({ moduleId, parameter }: NumberParameterProps) => {
  const dispatch = useAppDispatch();
  const {
    name,
    kind,
    value,
    label,
    min,
    max,
    step,
    withRandomizeButton,
    withSteppers,
  } = parameter;

  const handleOnChange = (v: string | number) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        parameterName: name,
        value: Number(v),
      })
    );
  return (
    <ParameterLabel label={label}>
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
    </ParameterLabel>
  );
};

export default NumberParameter;
