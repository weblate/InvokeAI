import { Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { updateModuleParameterValue } from '../../invokerSlice';
import { SelectField } from '../../types';

type SelectFieldComponentProps = {
  moduleId: string;
  field: SelectField;
  fieldId: string;
};
const SelectFieldComponent = ({
  moduleId,
  field,
  fieldId,
}: SelectFieldComponentProps) => {
  const dispatch = useAppDispatch();
  const { value, options } = field;
  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        fieldId,
        value: e.target.value,
      })
    );
  return (
    <Select value={value} onChange={handleOnChange} size={'sm'}>
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </Select>
  );
};

export default SelectFieldComponent;
