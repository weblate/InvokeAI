import { Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { SelectModuleParameter } from '../types';
import ParameterLabel from './ParameterLabel';

type SelectParameterProps = {
  moduleId: string;
  parameter: SelectModuleParameter;
  isDisabled?: boolean;
};
const SelectParameter = ({
  moduleId,
  parameter,
  isDisabled,
}: SelectParameterProps) => {
  const dispatch = useAppDispatch();
  const { id, value, options, connectable } = parameter;
  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        parameterId: id,
        value: e.target.value,
      })
    );
  return (
    <ParameterLabel parameter={parameter} isDisabled={isDisabled}>
      {!(connectable && connectable.includes('target')) && (
        <Select value={value} onChange={handleOnChange} size={'sm'}>
          {options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
      )}
    </ParameterLabel>
  );
};

export default SelectParameter;
