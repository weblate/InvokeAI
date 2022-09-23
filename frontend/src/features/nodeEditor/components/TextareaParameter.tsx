import { Textarea } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { TextareaModuleParameter } from '../types';
import ParameterLabel from './ParameterLabel';

type TextareaParameterProps = {
  moduleId: string;
  parameter: TextareaModuleParameter;
};
const TextareaParameter = ({ moduleId, parameter }: TextareaParameterProps) => {
  const dispatch = useAppDispatch();
  const { name, kind, value, label } = parameter;
  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        parameterName: name,
        value: e.target.value,
      })
    );
  return (
    <ParameterLabel label={label}>
      <Textarea value={value} onChange={handleOnChange} size={'sm'} />
    </ParameterLabel>
  );
};

export default TextareaParameter;
