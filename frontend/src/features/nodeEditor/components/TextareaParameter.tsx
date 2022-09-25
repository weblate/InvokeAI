import { Textarea } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { TextareaModuleParameter } from '../types';

type TextareaParameterProps = {
  moduleId: string;
  parameter: TextareaModuleParameter;
};
const TextareaParameter = ({ moduleId, parameter }: TextareaParameterProps) => {
  const dispatch = useAppDispatch();
  const { id, value } = parameter;
  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        parameterId: id,
        value: e.target.value,
      })
    );
  return <Textarea value={value} onChange={handleOnChange} size={'sm'} />;
};

export default TextareaParameter;
