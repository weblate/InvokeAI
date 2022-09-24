import { Textarea } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { TextareaModuleParameter } from '../types';
import ParameterLabel from './ParameterLabel';

type TextareaParameterProps = {
  moduleId: string;
  parameter: TextareaModuleParameter;
  isDisabled?: boolean
};
const TextareaParameter = ({ moduleId, parameter, isDisabled }: TextareaParameterProps) => {
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
  return (
    <ParameterLabel parameter={parameter} isDisabled={isDisabled}>
      <Textarea value={value} onChange={handleOnChange} size={'sm'} />
    </ParameterLabel>
  );
};

export default TextareaParameter;
