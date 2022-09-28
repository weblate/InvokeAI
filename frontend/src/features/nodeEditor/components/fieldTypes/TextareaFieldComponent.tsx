import { Textarea } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { updateModuleParameterValue } from '../../invokerSlice';
import { TextareaField } from '../../types';

type TextareaFieldComponentProps = {
  moduleId: string;
  field: TextareaField;
  fieldId: string;
};
const TextareaFieldComponent = ({
  moduleId,
  field,
  fieldId,
}: TextareaFieldComponentProps) => {
  const dispatch = useAppDispatch();
  const { value } = field;
  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        fieldId,
        value: e.target.value,
      })
    );
  return <Textarea value={value} onChange={handleOnChange} size={'sm'} />;
};

export default TextareaFieldComponent;
