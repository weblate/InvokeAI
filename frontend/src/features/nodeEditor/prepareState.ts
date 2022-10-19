import _ from 'lodash';
import { Edge, Node } from 'reactflow';

const prepareState = (nodes: Node[], edges: Edge[]) => {
  const formattedNodes = nodes.map((node: Node) => {
    let nodeType: string;
    // if (node.data.moduleType === 'generate') {
    //   if (
    //     edges.find(
    //       (edge: Edge) =>
    //         edge.target === node.id && edge.targetHandle === 'image'
    //     )
    //   ) {
    //     nodeType = 'img2img';
    //   } else {
    //     nodeType = 'txt2img';
    //   }
    // } else {
    //   nodeType = node.data.moduleType;
    // }

    const formattedFields = _.reduce(
      node.data.fields,
      (
        formattedFields: Record<string, any>,
        currentField: Record<string, any>,
        currentFieldId: string
      ) => {
        formattedFields[currentFieldId] = currentField.value;
        return formattedFields;
      },
      {}
    );

    return {
      id: node.id,
      type: node.data.moduleType,
      ...formattedFields,
    };
  });

  const formattedEdges = edges.map((edge: Edge) => {
    if (edge.sourceHandle && edge.targetHandle) {
      return {
        from_node: {
          id: edge.source,
          field: edge.sourceHandle,
        },
        to_node: {
          id: edge.target,
          field: edge.targetHandle,
        },
      };
    }
  });

  return {
    nodes: formattedNodes,
    links: formattedEdges,
  };
};

export default prepareState;
