import { Switch } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { ToggleModuleParameter } from '../types';

type ToggleParameterProps = {
  moduleId: string;
  parameter: ToggleModuleParameter;
};

const ToggleParameter = ({ moduleId, parameter }: ToggleParameterProps) => {
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
  return <Switch checked={value} onChange={handleOnChange} size={'sm'} />;
};

export default ToggleParameter;
