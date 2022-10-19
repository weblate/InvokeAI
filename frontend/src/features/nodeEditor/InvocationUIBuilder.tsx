import { Box, Flex, Heading, IconButton, Spacer } from '@chakra-ui/react';
import _ from 'lodash';
import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { Connection, NodeProps, useReactFlow } from 'reactflow';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import InvocationField from './components/InvocationField';
import InvocationFieldLabel from './components/InvocationFieldLabel';
import InvocationHandle from './components/InvocationHandle';
import InvocationHandleLabel from './components/InvocationHandleLabel';
import { Invocation } from './types';
import useDynamicRefs from 'use-dynamic-refs';

type FieldRefObject = Record<string, HTMLDivElement | null>;

function InvocationUIBuilder(props: NodeProps<Invocation>) {
  const { id: moduleId, data, selected } = props;
  const { moduleLabel, fields, outputs } = data;

  const flow = useReactFlow();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const fieldRefs = useRef<FieldRefObject>({});

  // useEffect(() => {
  //   fieldRefs.current = _.reduce(
  //     fields,
  //     (acc: FieldRefObject, field, id) => {
  //       acc[id] = null;
  //       return acc;
  //     },
  //     {}
  //   );
  // }, [fields]);

  // Check if an in-progress connection is valid
  const isValidConnection = useCallback(
    (connection: Connection): boolean => {
      const edges = flow.getEdges();
      // Connection is invalid if target already has a connection
      if (
        edges.find((edge) => {
          return (
            edge.target === connection.target &&
            edge.targetHandle === connection.targetHandle
          );
        })
      ) {
        return false;
      }

      // Find the source and target nodes...
      if (connection.source && connection.target) {
        const sourceNode = flow.getNode(connection.source);
        const targetNode = flow.getNode(connection.target);

        // Conditional guards against undefined nodes/handles
        if (
          sourceNode &&
          targetNode &&
          connection.sourceHandle &&
          connection.targetHandle
        ) {
          // connection types must be the same for a connection
          return (
            sourceNode.data.outputs[connection.sourceHandle].type ===
            targetNode.data.fields[connection.targetHandle].type
          );
        }
      }

      // Default to invalid
      return false;
    },
    [flow]
  );

  // const isDependsOnConnected = useCallback(
  //   (field: Field): boolean => {
  //     return field.dependsOn
  //       ? Boolean(
  //           flow
  //             .getEdges()
  //             .find(
  //               (edge) =>
  //                 edge.target === moduleId &&
  //                 edge.targetHandle ===
  //                   fields[field.dependsOn as keyof Field].id
  //             )
  //         )
  //       : true;
  //   },
  //   [flow, moduleId, fields]
  // );

  return (
    <Flex
      borderWidth={1}
      rounded={'md'}
      direction={'column'}
      cursor={'initial'}
      minWidth={'300px'}
      className={`node ${selected && 'selected'}`}
    >
      <Flex
        className={`node-drag-handle node-header ${selected && 'selected'}`}
        cursor={'move'}
        borderTopRadius={'md'}
        p={2}
      >
        <Heading size={'sm'}>{moduleLabel}</Heading>
        <Spacer />
        <IconButton
          size={'sm'}
          fontSize={'md'}
          variant={'link'}
          aria-label="Collapse/open node"
          onClick={() => setIsExpanded(!isExpanded)}
          icon={isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        />
      </Flex>
      <Flex direction={'column'} gap={2} cursor={'initial'} p={2}>
        {_.map(fields, (field, id) => {
          const {
            type,
            label,
            ui: { requires_connection, depends_on },
          } = field;
          const isDisabled = !(depends_on
            ? Boolean(
                flow
                  .getEdges()
                  .find(
                    (edge) =>
                      edge.target === moduleId &&
                      edge.targetHandle === depends_on
                  )
              )
            : true);
          return (
            <div key={id} ref={(el) => (fieldRefs.current[id] = el)}>
              {!requires_connection && isExpanded && (
                <Box position={'relative'} width={'100%'}>
                  <InvocationFieldLabel field={field} isDisabled={isDisabled}>
                    <InvocationField
                      field={field}
                      moduleId={moduleId}
                      fieldId={id}
                    />
                  </InvocationFieldLabel>
                </Box>
              )}

              {requires_connection && (
                <InvocationHandleLabel label={label} handleType={'target'}>
                  <InvocationHandle
                    handleType={'target'}
                    id={id}
                    type={type}
                    label={label}
                    isValidConnection={isValidConnection}
                    moduleId={moduleId}
                  />
                </InvocationHandleLabel>
              )}
            </div>
          );
        })}
        {_.map(outputs, (output, key) => {
          const {
            type,
            label,
            ui: { next_to },
          } = output;
          const style: CSSProperties = {};
          if (next_to) {
            style.top = fieldRefs.current[next_to]?.clientHeight;
          }
          return (
            <InvocationHandleLabel
              key={key}
              label={label}
              handleType={'source'}
            >
              <InvocationHandle
                handleType={'source'}
                id={key}
                type={type}
                label={label}
                isValidConnection={isValidConnection}
                nextTo={next_to}
                moduleId={moduleId}
                style={style}
              />
            </InvocationHandleLabel>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default InvocationUIBuilder;
