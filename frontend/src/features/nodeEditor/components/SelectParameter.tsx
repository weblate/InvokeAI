import { Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { SelectModuleParameter } from '../types';
import ParameterLabel from './ParameterLabel';

type SelectParameterProps = {
  moduleId: string;
  parameter: SelectModuleParameter;
};
const SelectParameter = ({ moduleId, parameter }: SelectParameterProps) => {
  const dispatch = useAppDispatch();
  const { name, kind, value, label, options } = parameter;
  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        parameterName: name,
        value: Number(e.target.value),
      })
    );
  return (
    <ParameterLabel label={label}>
      <Select value={value} onChange={handleOnChange} size={'sm'}>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </Select>
    </ParameterLabel>
  );
};

export default SelectParameter;
