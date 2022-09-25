import { Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { SelectModuleParameter } from '../types';

type SelectParameterProps = {
  moduleId: string;
  parameter: SelectModuleParameter;
};
const SelectParameter = ({ moduleId, parameter }: SelectParameterProps) => {
  const dispatch = useAppDispatch();
  const { id, value, options } = parameter;
  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        parameterId: id,
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

export default SelectParameter;
