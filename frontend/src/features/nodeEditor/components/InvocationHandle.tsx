import { Tooltip } from '@chakra-ui/react';
import { Connection, Handle, Position } from 'reactflow';
import { DataType } from '../types';

type InvocationHandleProps = {
  handleType: 'source' | 'target';
  id: string;
  label?: string;
  type: DataType;
  isValidConnection: (connection: Connection) => boolean;
};

const InvocationHandle = ({
  handleType,
  id,
  label,
  type,
  isValidConnection,
}: InvocationHandleProps) => {
  const position = handleType === 'source' ? Position.Right : Position.Left;

  return (
    <Tooltip label={label}>
      <Handle
        type={handleType}
        position={position}
        id={id}
        className={`invoke-ai__handle invoke-ai__handle_${handleType} invoke-ai__handle_${type}`}
        isValidConnection={isValidConnection}
      />
    </Tooltip>
  );
};

export default InvocationHandle;
