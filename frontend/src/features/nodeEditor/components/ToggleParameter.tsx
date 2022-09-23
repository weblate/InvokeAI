import { Switch } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { ToggleModuleParameter } from '../types';
import ParameterLabel from './ParameterLabel';

type ToggleParameterProps = {
  moduleId: string;
  parameter: ToggleModuleParameter;
};

const ToggleParameter = ({ moduleId, parameter }: ToggleParameterProps) => {
  const dispatch = useAppDispatch();
  const { name, kind, value, label } = parameter;
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        parameterName: name,
        value: e.target.checked,
      })
    );
  return (
    <ParameterLabel label={label}>
      <Switch checked={value} onChange={handleOnChange} size={'sm'} />
    </ParameterLabel>
  );
};

export default ToggleParameter;
