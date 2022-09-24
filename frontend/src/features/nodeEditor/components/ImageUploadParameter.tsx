import { Text } from '@chakra-ui/react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { ImageUploadModuleParameter } from '../types';
import ParameterLabel from './ParameterLabel';

type ImageUploadParameterProps = {
  moduleId: string;
  parameter: ImageUploadModuleParameter;
};

const ImageUploadParameter = ({
  moduleId,
  parameter,
}: ImageUploadParameterProps) => {
  const dispatch = useAppDispatch();
  const { id, label, type, value } = parameter;

  const handleOnChange = (v: string | number) =>
    dispatch(
      updateModuleParameterValue({
        id: moduleId,
        parameterId: id,
        value: Number(v),
      })
    );
  return (
    <ParameterLabel label={label}>
      <Text>[Image Upload UI Placeholder]</Text>
    </ParameterLabel>
  );
};

export default ImageUploadParameter;
