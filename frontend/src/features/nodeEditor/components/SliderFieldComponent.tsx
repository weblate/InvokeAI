import {
  NumberInput,
  NumberInputField,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../invokerSlice';
import { SliderField } from '../types';

type SliderFieldComponentProps = {
  moduleId: string;
  field: SliderField;
  fieldId: string;
};

const SliderFieldComponent = ({
  moduleId,
  field,
  fieldId,
}: SliderFieldComponentProps) => {
  const dispatch = useAppDispatch();

  const { value, label, min, max, step, withNumberInput, numberInputMax } =
    field;
  const handleOnChangeSlider = (value: number) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        fieldId,
        value,
      })
    );

  const handleOnChangeNumberInput = (value: string | number) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        fieldId,
        value: Number(value),
      })
    );

  return (
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
  );
};

export default SliderFieldComponent;
