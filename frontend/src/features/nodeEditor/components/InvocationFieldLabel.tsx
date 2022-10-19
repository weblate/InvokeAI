import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  SystemProps,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { Field } from '../types';

type InvocationFieldLabelProps = {
  field: Field;
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

const InvocationFieldLabel = ({
  field,
  children,
  isDisabled = false,
}: InvocationFieldLabelProps) => {
  const {
    label,
    description,
    ui: { hide_label, label_position },
  } = field;

  return (
    <FormControl isDisabled={isDisabled}>
      {label && !hide_label ? (
        <FormLabel marginBottom={0} marginInlineEnd={0}>
          <Flex
            gap={2}
            justifyContent={'space-between'}
            alignItems={label_position ? alignItems[label_position] : 'center'}
            direction={label_position ? directions[label_position] : 'row'}
            textAlign={'left'}
          >
            <Flex gap={2} alignItems={'center'}>
              <Tooltip label={description}>
                <Flex alignItems={'center'}>
                  <Icon as={FaQuestionCircle} />
                </Flex>
              </Tooltip>
              <Text fontSize={'sm'} whiteSpace="nowrap">
                {label}
              </Text>
            </Flex>
            {children}
          </Flex>
        </FormLabel>
      ) : (
        children
      )}
    </FormControl>
  );
};

export default InvocationFieldLabel;
