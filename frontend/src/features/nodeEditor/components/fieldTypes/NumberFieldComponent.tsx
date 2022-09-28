import {
  IconButton,
  NumberInput,
  NumberInputField,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { FaRandom } from 'react-icons/fa';
import { NUMPY_RAND_MAX } from '../../../../app/constants';
import { useAppDispatch } from '../../../../app/store';
import randomInt, { randomMultiple } from '../../../../common/util/randomInt';
import { updateModuleParameterValue } from '../../invokerSlice';
import { NumberField } from '../../types';

type NumberFieldComponentProps = {
  moduleId: string;
  field: NumberField;
  fieldId: string;
};

const NumberFieldComponent = ({
  moduleId,
  field,
  fieldId,
}: NumberFieldComponentProps) => {
  const dispatch = useAppDispatch();

  const {
    value,
    type,
    ui_type,
    label,
    minimum,
    exclusive_minimum,
    maximum,
    exclusive_maximum,
    multiple_of,
    ui: {
      with_slider,
      with_number_input,
      slider_min,
      slider_max,
      depends_on,
      label_position,
      number_input_max,
      number_input_min,
      optional,
      requires_connection,
      with_randomize_button,
      with_randomize_icon_button,
      with_steppers,
    },
  } = field;

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

  const handleOnClickRandomize = () => {
    const payload: { id: string; fieldId: string; value: number } = {
      id: moduleId,
      fieldId,
      value: 0,
    };

    if (multiple_of !== undefined) {
      payload.value = randomMultiple(min, max, multiple_of);
    } else if (type === 'integer') {
      payload.value = randomInt(min, max);
    } else {
      payload.value = randomMultiple(min, max, 0.01);
    }

    dispatch(updateModuleParameterValue(payload));
  };

  let min: number;
  if (exclusive_minimum !== undefined) {
    if (type === 'integer') {
      if (multiple_of !== undefined) {
        min = exclusive_minimum + multiple_of;
      } else {
        min = exclusive_minimum + 1;
      }
    } else {
      if (multiple_of !== undefined) {
        min = exclusive_minimum + multiple_of;
      } else {
        min = exclusive_minimum + 0.01;
      }
    }
  } else if (minimum !== undefined) {
    min = minimum;
  } else {
    min = 0;
  }

  let max: number;
  if (exclusive_maximum !== undefined) {
    if (type === 'integer') {
      if (multiple_of !== undefined) {
        max = exclusive_maximum - multiple_of;
      } else {
        max = exclusive_maximum - 1;
      }
    } else {
      if (multiple_of !== undefined) {
        max = exclusive_maximum - multiple_of;
      } else {
        max = exclusive_maximum - 0.01;
      }
    }
  } else if (maximum !== undefined) {
    max = maximum;
  } else {
    max = NUMPY_RAND_MAX;
  }

  let step: number;
  if (multiple_of !== undefined) {
    step = multiple_of;
  } else if (type === 'integer') {
    step = 1;
  } else {
    step = 0.1;
  }

  return (
    <>
      {(with_slider || ui_type === 'slider') && (
        <Slider
          aria-label={label}
          value={value}
          min={slider_min !== undefined ? slider_min : min}
          max={slider_max !== undefined ? slider_max : max}
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
      )}
      {(with_number_input || ui_type === 'number_input') && (
        <NumberInput
          size={'sm'}
          onChange={handleOnChangeNumberInput}
          min={number_input_min !== undefined ? number_input_min : min}
          max={number_input_max !== undefined ? number_input_max : max}
          step={multiple_of}
          value={
            multiple_of && multiple_of < 1
              ? (Math.round(value * 100) / 100).toFixed(2)
              : value.toString()
          }
        >
          <NumberInputField paddingInlineStart={2} paddingInlineEnd={2} />
        </NumberInput>
      )}
      {with_randomize_icon_button && (
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
