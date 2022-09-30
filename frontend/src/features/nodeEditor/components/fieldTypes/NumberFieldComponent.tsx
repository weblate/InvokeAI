import {
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
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

const labelStyles = {
  mt: '1.5',
  ml: '-2.5',
  fontSize: 'xs',
};

const makeSliderMarks = (
  with_slider_marks?: boolean | number[],
  min?: number,
  max?: number
) => {
  if (with_slider_marks !== undefined) {
    if (typeof with_slider_marks === 'boolean') {
      if (min !== undefined && max !== undefined) {
        return (
          <>
            <SliderMark value={min} {...labelStyles}>{min}</SliderMark>
            <SliderMark value={max} {...labelStyles}>{max}</SliderMark>
          </>
        );
      }
    } else {
      return (
        <>
          {with_slider_marks.map((v, i) => (
            <SliderMark key={i} value={v} {...labelStyles}>{v}</SliderMark>
          ))}
        </>
      );
    }
  }
};

const NumberFieldComponent = ({
  moduleId,
  field,
  fieldId,
}: NumberFieldComponentProps) => {
  const dispatch = useAppDispatch();
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

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
      with_number_display,
      with_slider_marks,
      unit,
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
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          ml={1}
          mr={1}
        >
          {makeSliderMarks(with_slider_marks, min, max)}
          <SliderTrack />
          <Tooltip hasArrow placement="top" isOpen={showTooltip} label={`${value}${unit ? unit : ''}`}>
            <SliderThumb />
          </Tooltip>
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
          {with_steppers && (
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          )}
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
      {with_number_display && <Text>{value}</Text>}
    </>
  );
};

export default NumberFieldComponent;
