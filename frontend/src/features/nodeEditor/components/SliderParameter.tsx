import {
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
};

const SliderParameter = ({ moduleId, parameter }: SliderParameterProps) => {
  const dispatch = useAppDispatch();
  const { name, kind, value, label, min, max, step } = parameter;
  const handleOnChange = (value: number) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        parameterName: name,
        value,
      })
    );

  return (
    <ParameterLabel label={label}>
      <Slider
        aria-label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleOnChange}
        size={'sm'}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </ParameterLabel>
  );
};

export default SliderParameter;
