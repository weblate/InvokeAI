import { ReactFlowProvider } from 'reactflow';
// or if you just want basic styles
import 'reactflow/dist/base.css';
// default styling
// import 'reactflow/dist/style.css';
import Flow from '../../nodeEditor';

const Nodes = () => {
  return (
    <div className="nodes-panel">
      <div className="nodes-workarea">
        <ReactFlowProvider>
          <Flow />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default Nodes;
