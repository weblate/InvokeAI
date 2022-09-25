import { Input, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { TextModuleParameter } from '../types';
import ParameterLabel from './ParameterLabel';

type TextParameterProps = {
  moduleId: string;
  parameter: TextModuleParameter;
  isDisabled?: boolean;
};

const TextParameter = ({
  moduleId,
  parameter,
  isDisabled,
}: TextParameterProps) => {
  const dispatch = useAppDispatch();
  const { id, value, connectable } = parameter;
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
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
        <Input value={value} onChange={handleOnChange} size={'sm'} id={id} />
      )}
    </ParameterLabel>
  );
};

export default TextParameter;
