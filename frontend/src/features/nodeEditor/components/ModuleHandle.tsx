import { Tooltip } from '@chakra-ui/react';
import { CSSProperties } from 'react';
import { Connection, Handle, Position } from 'react-flow-renderer';
import { ModuleParameter } from '../types';


type ModuleHandleProps = {
  handleType: 'source' | 'target';
  id: string;
  label?: string;
  type: string;
  isValidConnection: (connection: Connection) => boolean;
  // offset: string;
  // style: CSSProperties;
};

const ModuleHandle = ({
  handleType,
  id,
  label,
  type,
  isValidConnection,
  // offset,
  // style
}: ModuleHandleProps) => {

  const style: CSSProperties = {
    width: '1rem',
    height: '1rem',
    // background: handleColors[type],
  };

  if (handleType === 'source') {
    // style.bottom = offset;
    style.right = '-1.2rem';
  } else {
    style.left = '-1.2rem';
    // style.top = offset;
  }

  const position = handleType === 'source' ? Position.Right : Position.Left;

  return (
    <Tooltip label={label}>
      <Handle
        type={handleType}
        position={position}
        id={id}
        style={style}
        isValidConnection={isValidConnection}
      />
    </Tooltip>
  );
};

export default ModuleHandle;
