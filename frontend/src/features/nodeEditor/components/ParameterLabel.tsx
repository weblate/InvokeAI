import { Flex, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { ReactElement } from 'react';

type ParameterLabelProps = {
  label?: string;
  children: ReactElement;
};

const ParameterLabel = ({ label, children }: ParameterLabelProps) => {
  return (
    <FormControl>
      <Flex gap={2} justifyContent={'space-between'} alignItems={'center'}>
        {label && (
          <FormLabel marginBottom={0}>
            <Text fontSize={'sm'} whiteSpace="nowrap">
              {label}
            </Text>
          </FormLabel>
        )}
        {children}
      </Flex>
    </FormControl>
  );
};

export default ParameterLabel;
