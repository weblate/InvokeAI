import { Image, Text } from '@chakra-ui/react';
import { useAppDispatch } from '../../../app/store';
import { updateModuleParameterValue } from '../nodeEditorSlice';
import { ImageField } from '../types';

type ImageFieldComponentProps = {
  moduleId: string;
  field: ImageField;
  fieldId: string;
};

const ImageFieldComponent = ({
  moduleId,
  field,
  fieldId,
}: ImageFieldComponentProps) => {
  // const dispatch = useAppDispatch();
  const { value } = field;

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

export default ImageFieldComponent;
