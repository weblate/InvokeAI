import { Input } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../invokerSlice';
import { TextField } from '../types';

type TextFieldComponentProps = {
  moduleId: string;
  field: TextField;
  fieldId: string;
};

const TextFieldComponent = ({
  moduleId,
  field,
  fieldId,
}: TextFieldComponentProps) => {
  const dispatch = useAppDispatch();
  const { value } = field;
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        fieldId,
        value: e.target.value,
      })
    );
  return <Input value={value} onChange={handleOnChange} size={'sm'} />;
};

export default TextFieldComponent;
