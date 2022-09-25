import { Tooltip } from '@chakra-ui/react';
import { CSSProperties } from 'react';
import { Connection, Handle, Position } from 'react-flow-renderer';
import { ModuleParameter } from '../types';

type ModuleHandleProps = {
  handleType: 'source' | 'target';
  id: string;
  label?: string;
  dataType: string;
  isValidConnection: (connection: Connection) => boolean;
};

const ModuleHandle = ({
  handleType,
  id,
  label,
  dataType,
  isValidConnection,
}: ModuleHandleProps) => {
  const position = handleType === 'source' ? Position.Right : Position.Left;

  return (
    <Tooltip label={label}>
      <Handle
        type={handleType}
        position={position}
        id={id}
        className={`invoke-ai__handle invoke-ai__handle_${handleType} invoke-ai__handle_${dataType}`}
        isValidConnection={isValidConnection}
      />
    </Tooltip>
  );
};

export default ModuleHandle;
