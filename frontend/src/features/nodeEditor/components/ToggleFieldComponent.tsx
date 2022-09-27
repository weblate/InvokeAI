import { Switch } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../invokerSlice';
import { ToggleField } from '../types';

type ToggleFieldComponentProps = {
  moduleId: string;
  field: ToggleField;
  fieldId: string;
};

const ToggleFieldComponent = ({
  moduleId,
  field,
  fieldId,
}: ToggleFieldComponentProps) => {
  const dispatch = useAppDispatch();
  const { value } = field;
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        fieldId,
        value: e.target.checked,
      })
    );
  return <Switch checked={value} onChange={handleOnChange} size={'sm'} />;
};

export default ToggleFieldComponent;
