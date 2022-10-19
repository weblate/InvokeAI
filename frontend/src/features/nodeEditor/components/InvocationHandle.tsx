import { Tooltip } from '@chakra-ui/react';
import { CSSProperties } from 'react';
import { Connection, Handle, Position } from 'reactflow';
import { DataType } from '../types';

type InvocationHandleProps = {
  handleType: 'source' | 'target';
  id: string;
  label?: string;
  type: DataType;
  isValidConnection: (connection: Connection) => boolean;
  nextTo?: string;
  moduleId: string;
  style: CSSProperties;
};

const InvocationHandle = ({
  handleType,
  id,
  label,
  type,
  isValidConnection,
  nextTo,
  moduleId,
  style,
}: InvocationHandleProps) => {
  const position = handleType === 'source' ? Position.Right : Position.Left;
  console.log(`${moduleId}-${nextTo}`)
  return (
    <Tooltip label={label}>
      <Handle
        type={handleType}
        position={position}
        id={id}
        className={`handle ${handleType} datatype-${type}`}
        isValidConnection={isValidConnection}
        style={style}
      />
    </Tooltip>
  );
};

export default InvocationHandle;
