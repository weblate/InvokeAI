import { Tooltip } from '@chakra-ui/react';
import { CSSProperties } from 'react';
import { Connection, Handle, Position } from 'react-flow-renderer';
import { NodeInput, NodeOutput } from '../types';

const handleColors = {
  TEXT: 'green',
  IMAGE: 'blue',
};

type ModuleHandleProps = {
  type: 'source' | 'target';
  inputOutput: NodeInput | NodeOutput;
  isValidConnection: (connection: Connection) => boolean;
  offset: string;
};

const ModuleHandle = ({
  type,
  inputOutput,
  isValidConnection,
  offset,
}: ModuleHandleProps) => {
  const { id, kind, label, value } = inputOutput;

  const style: CSSProperties = {
    width: '1rem',
    height: '1rem',
    background: handleColors[kind],
  };

  if (type === 'source') {
    style.bottom = offset;
    style.right = '-1rem';
  } else {
    style.left = '-1rem';
    style.top = offset;
  }

  const position = type === 'source' ? Position.Right : Position.Left;

  return (
    <Tooltip label={label}>
      <Handle
        type={type}
        position={position}
        id={id}
        style={style}
        isValidConnection={isValidConnection}
      />
    </Tooltip>
  );
};

export default ModuleHandle;
