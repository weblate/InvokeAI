import {
  Flex,
  FormControl,
  FormLabel,
  SystemProps,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { ModuleParameter } from '../types';

type ParameterLabelProps = {
  parameter: ModuleParameter;
  children: ReactNode;
  isDisabled?: boolean;
};

// Map label positions to flex-direction
const directions: Record<string, SystemProps['flexDirection']> = {
  top: 'column',
  bottom: 'column-reverse',
  left: 'row',
  right: 'row-reverse',
};

// Map label positions to align-items
const alignItems: Record<string, SystemProps['alignItems']> = {
  top: 'start',
  bottom: 'start',
  left: 'center',
  right: 'center',
};

const ParameterLabel = ({
  parameter,
  children,
  isDisabled = false,
}: ParameterLabelProps) => {
  const { label, labelPosition } = parameter;

  return (
    <FormControl isDisabled={isDisabled}>
      {label ? (
        <FormLabel marginBottom={0} marginInlineEnd={0}>
          <Flex
            gap={2}
            justifyContent={'space-between'}
            alignItems={labelPosition ? alignItems[labelPosition] : 'center'}
            direction={labelPosition ? directions[labelPosition] : 'row'}
            textAlign={'left'}
          >
            <Text fontSize={'sm'} whiteSpace="nowrap">
              {label}
            </Text>
            {children}
          </Flex>
        </FormLabel>
      ) : (
        children
      )}
    </FormControl>
  );
};

export default ParameterLabel;
