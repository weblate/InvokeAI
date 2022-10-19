import { Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type InvocationHandleLabelProps = {
  label: string;
  children: ReactNode;
  handleType: 'source' | 'target';
};

const InvocationHandleLabel = ({
  label,
  children,
  handleType,
}: InvocationHandleLabelProps) => {
  return (
    <Flex
      width={'100%'}
      justifyContent={handleType === 'source' ? 'flex-end' : 'flex-start'}
      pl={handleType === 'source' ? undefined : 3.5}
      position={'relative'}
    >
      <Text fontWeight={'light'} fontSize={'sm'}>
        {label}
      </Text>
      {children}
    </Flex>
  );
};

export default InvocationHandleLabel;
