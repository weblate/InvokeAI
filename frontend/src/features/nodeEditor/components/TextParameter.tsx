import { Input } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { TextModuleParameter } from '../types';
import ParameterLabel from './ParameterLabel';

type TextParameterProps = { moduleId: string; parameter: TextModuleParameter };
const TextParameter = ({ moduleId, parameter }: TextParameterProps) => {
  const dispatch = useAppDispatch();
  const { id, value, label } = parameter;
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        parameterId: id,
        value: e.target.value,
      })
    );
  return (
    <ParameterLabel label={label}>
      <Input value={value} onChange={handleOnChange} size={'sm'} id={id}/>
    </ParameterLabel>
  );
};

export default TextParameter;
