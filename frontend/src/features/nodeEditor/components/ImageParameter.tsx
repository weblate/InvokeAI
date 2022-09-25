import { Image, Text } from '@chakra-ui/react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { ImageModuleParameter } from '../types';
import ParameterLabel from './ParameterLabel';

type ImageParameterProps = {
  moduleId: string;
  parameter: ImageModuleParameter;
};

const ImageParameter = ({ moduleId, parameter }: ImageParameterProps) => {
  // const dispatch = useAppDispatch();
  const { id, value, connectable } = parameter;

  // const handleOnChange = (v: string | number) =>
  //   dispatch(
  //     updateModuleParameterValue({
  //       id: moduleId,
  //       parameterId: id,
  //       value: Number(v),
  //     })
  //   );
  return (
    <>
      <Text>{value}</Text>
      <Image src={value} maxWidth={'300px'} />
    </>
  );
};

export default ImageParameter;
