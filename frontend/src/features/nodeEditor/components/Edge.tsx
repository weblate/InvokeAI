import { BaseEdge, EdgeProps } from 'reactflow';

function CustomEdge(props: EdgeProps) {
  return <BaseEdge labelX={0} labelY={0} {...props} />;
}

export default CustomEdge
