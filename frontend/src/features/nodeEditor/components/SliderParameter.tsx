import {
  NumberInput,
  NumberInputField,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { SliderModuleParameter } from '../types';
import ParameterLabel from './ParameterLabel';

type SliderParameterProps = {
  moduleId: string;
  parameter: SliderModuleParameter;
  isDisabled?: boolean;
};

const SliderParameter = ({
  moduleId,
  parameter,
  isDisabled,
}: SliderParameterProps) => {
  const dispatch = useAppDispatch();

  const {
    id,
    value,
    label,
    min,
    max,
    step,
    withNumberInput,
    numberInputMax,
    connectable,
  } = parameter;
  const handleOnChangeSlider = (value: number) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        parameterId: id,
        value,
      })
    );

  const handleOnChangeNumberInput = (value: string | number) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        parameterId: id,
        value: Number(value),
      })
    );

  return (
    <ParameterLabel parameter={parameter} isDisabled={isDisabled}>
      {!(connectable && connectable.includes('target')) && (
        <>
          <Slider
            aria-label={label}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={handleOnChangeSlider}
            size={'sm'}
            focusThumbOnChange={false}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          {withNumberInput && (
            <NumberInput
              size={'sm'}
              onChange={handleOnChangeNumberInput}
              min={min}
              max={numberInputMax !== undefined ? numberInputMax : max}
              step={step}
              value={
                step < 1
                  ? (Math.round(value * 100) / 100).toFixed(2)
                  : value.toString()
              }
            >
              <NumberInputField paddingInlineStart={2} paddingInlineEnd={2} />
            </NumberInput>
          )}
        </>
      )}
    </ParameterLabel>
  );
};

export default SliderParameter;
