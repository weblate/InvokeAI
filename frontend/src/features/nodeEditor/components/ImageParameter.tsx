import { Text } from '@chakra-ui/react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { ImageModuleParameter } from '../types';
import ParameterLabel from './ParameterLabel';

type ImageParameterProps = {
  moduleId: string;
  parameter: ImageModuleParameter;
  isDisabled: boolean;
};

const ImageParameter = ({
  moduleId,
  parameter,
  isDisabled,
}: ImageParameterProps) => {
  // const dispatch = useAppDispatch();
  const { id, value } = parameter;

  // const handleOnChange = (v: string | number) =>
  //   dispatch(
  //     updateModuleParameterValue({
  //       id: moduleId,
  //       parameterId: id,
  //       value: Number(v),
  //     })
  //   );
  return (
    <ParameterLabel parameter={parameter} isDisabled={isDisabled}>
      <Text>[Image Upload UI Placeholder]</Text>
    </ParameterLabel>
  );
};

export default ImageParameter;
