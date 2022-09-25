import { Box, Text } from '@chakra-ui/react';
import _ from 'lodash';
import { Edge, Node, useEdges, useNodes } from 'react-flow-renderer';

const Logger = () => {
  // // Nodes from Kyle's backend for testing, need to output something like this in API call
  // {
  //     "nodes":[
  //         {"id":"1","type":"txt2img","prompt":"A man smiling"},
  //         {"id":"2","type":"show_image"},
  //         {"id":"3","type":"img2img","prompt":"A man wearing a red hat and smiling","strength":"0.5"},
  //         {"id":"4","type":"show_image"},
  //         {"id":"5","type":"restore_face","strength":"0.5"},
  //         {"id":"6","type":"upscale","level":"2"},
  //         {"id":"7","type":"show_image"}
  //     ],
  //     "links":[
  //         {"from_node":{"id":"1","field":"image"},"to_node":{"id":"2","field":"image"}},
  //         {"from_node":{"id":"2","field":"image"},"to_node":{"id":"3","field":"image"}},
  //         {"from_node":{"id":"3","field":"image"},"to_node":{"id":"4","field":"image"}},
  //         {"from_node":{"id":"4","field":"image"},"to_node":{"id":"5","field":"image"}},
  //         {"from_node":{"id":"5","field":"image"},"to_node":{"id":"6","field":"image"}},
  //         {"from_node":{"id":"6","field":"image"},"to_node":{"id":"7","field":"image"}}
  //     ]
  // }
  const nodes = useNodes();
  const edges = useEdges();

  const formattedNodes = nodes.map((node: Node) => {
    let nodeType = '';
    if (node.data.moduleType === 'generateModule') {
      if (
        edges.find(
          (edge: Edge) =>
            edge.target === node.id && edge.targetHandle === 'initialImage'
        )
      ) {
        nodeType = 'img2img';
      } else {
        nodeType = 'txt2img';
      }
    } else {
      nodeType = node.data.moduleType;
    }

    const parameters = _.reduce(
      node.data.parameters,
      (acc: Record<string, any>, curr: Record<string, any>) => {
        acc[curr.id] = curr.value;
        return acc;
      },
      {}
    );
    return {
      id: node.id,
      type: nodeType,
      ...parameters,
    };
  });

  const formattedEdges = edges.map((edge: Edge) => {
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
  });

  const data = {
    nodes: formattedNodes,
    links: formattedEdges,
  };
  return (
    <Box fontSize={12}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Box>
  );
};

export default Logger;
