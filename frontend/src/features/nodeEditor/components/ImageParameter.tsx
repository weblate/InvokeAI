import { Image, Text } from '@chakra-ui/react';
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
    <ParameterLabel parameter={parameter} isDisabled={isDisabled}>
      {!(connectable && connectable.includes('target')) && (
        <>
          <Text>{value}</Text>
          <Image src={value} maxWidth={'300px'} />
        </>
      )}
    </ParameterLabel>
  );
};

export default ImageParameter;
