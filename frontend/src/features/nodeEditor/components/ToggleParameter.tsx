import { Switch } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { ToggleModuleParameter } from '../types';
import ParameterLabel from './ParameterLabel';

type ToggleParameterProps = {
  isDisabled?: boolean;
  moduleId: string;
  parameter: ToggleModuleParameter;
};

const ToggleParameter = ({ moduleId, parameter, isDisabled }: ToggleParameterProps) => {
  const dispatch = useAppDispatch();
  const { id, value } = parameter;
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        parameterId: id,
        value: e.target.checked,
      })
    );
  return (
    <ParameterLabel parameter={parameter} isDisabled={isDisabled}>
      <Switch checked={value} onChange={handleOnChange} size={'sm'} />
    </ParameterLabel>
  );
};

export default ToggleParameter;
