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
    withRandomizeIconButton,
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

  const handleOnClickRandomize = () => {
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        parameterName: name,
        value: randomInt(min, max),
      })
    );
  };

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
    </ParameterLabel>
  );
};

export default NumberParameter;
