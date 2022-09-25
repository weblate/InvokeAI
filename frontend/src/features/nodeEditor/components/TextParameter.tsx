import { Input } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { TextModuleParameter } from '../types';

type TextParameterProps = {
  moduleId: string;
  parameter: TextModuleParameter;
};

const TextParameter = ({ moduleId, parameter }: TextParameterProps) => {
  const dispatch = useAppDispatch();
  const { id, value } = parameter;
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        parameterId: id,
        value: e.target.value,
      })
    );
  return <Input value={value} onChange={handleOnChange} size={'sm'} id={id} />;
};

export default TextParameter;
