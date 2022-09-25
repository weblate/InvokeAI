import { extendTheme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

// Size of handles
const handleSize = 1.5;
const handleSizeUnit = 'rem';
const handleSizeString = `${handleSize}${handleSizeUnit}`;
const handleWidth = `${handleSize / 2}${handleSizeUnit}`;
const handleHeight = `${handleSize}${handleSizeUnit}`;

// Offset from the edge of the node
const handleOffset = `-${handleSize}${handleSizeUnit}`;

// Colors for datatypes
const darkStringColor = 'blue.500';
const lightStringColor = 'blue.400';
const darkImageColor = 'green.500';
const lightImageColor = 'green.400';
const darkNumberColor = 'yellow.500';
const lightNumberColor = 'yellow.400';
const darkBooleanColor = 'pink.500';
const lightBooleanColor = 'pink.400';

// Width of connection lines

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  components: {
    Tooltip: {
      baseStyle: (props: StyleFunctionProps) => ({
        textColor: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
      }),
    },
    Accordion: {
      baseStyle: (props: StyleFunctionProps) => ({
        button: {
          fontWeight: 'bold',
          _hover: {
            bgColor:
              props.colorMode === 'dark'
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.05)',
          },
        },
        panel: {
          paddingBottom: 2,
        },
      }),
    },
    FormLabel: {
      baseStyle: {
        fontWeight: 'light',
      },
    },
    Button: {
      variants: {
        imageHoverIconButton: (props: StyleFunctionProps) => ({
          bg: props.colorMode === 'dark' ? 'blackAlpha.700' : 'whiteAlpha.800',
          color:
            props.colorMode === 'dark' ? 'whiteAlpha.700' : 'blackAlpha.700',
          _hover: {
            bg:
              props.colorMode === 'dark' ? 'blackAlpha.800' : 'whiteAlpha.800',
            color:
              props.colorMode === 'dark' ? 'whiteAlpha.900' : 'blackAlpha.900',
          },
        }),
      },
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => {
      const { colorMode } = props;
      return {
        '.react-flow__handle-connecting': {
          background:
            colorMode === 'dark' ? 'red !important' : 'red !important',
        },
        '.react-flow__handle-valid': {
          background:
            colorMode === 'dark' ? 'green !important' : 'green !important',
        },
        '.react-flow__node': {
          shadow:
            colorMode === 'dark'
              ? '2px 2px 19px 0px rgba(255,255,255,0.08)'
              : '2px 2px 19px 0px rgba(0,0,0,0.08)',
        },
        'path.react-flow__connection-path': {
          strokeWidth: '4px',
        },
        '.invoke-ai__edge path': {
          strokeWidth: '5px',
          _hover: {
            strokeWidth: '7px',
          },
        },
        '.invoke-ai__edge_string path': {
          stroke: colorMode === 'dark' ? darkStringColor : lightStringColor,
        },
        '.invoke-ai__edge_image path': {
          stroke: colorMode === 'dark' ? darkImageColor : lightImageColor,
        },
        '.invoke-ai__edge_number path': {
          stroke: colorMode === 'dark' ? darkNumberColor : lightNumberColor,
        },
        '.invoke-ai__edge_boolean path': {
          stroke: colorMode === 'dark' ? darkBooleanColor : lightBooleanColor,
        },
        '.invoke-ai__handle': {
          width: handleWidth,
          height: handleHeight,
          border: 'none',
        },
        '.invoke-ai__handle_source': {
          right: handleOffset,
          borderRadius: `0 ${handleSizeString} ${handleSizeString} 0`,
        },
        '.invoke-ai__handle_target': {
          left: handleOffset,
          borderRadius: `${handleSizeString} 0 0 ${handleSizeString}`,
        },
        '.invoke-ai__handle_string': {
          background: colorMode === 'dark' ? darkStringColor : lightStringColor,
        },
        '.invoke-ai__handle_image': {
          background: colorMode === 'dark' ? darkImageColor : lightImageColor,
        },
        '.invoke-ai__handle_number': {
          background: colorMode === 'dark' ? darkNumberColor : lightNumberColor,
        },
        '.invoke-ai__handle_boolean': {
          background:
            colorMode === 'dark' ? darkBooleanColor : lightBooleanColor,
        },
        '.ivoke-ai__module': {
          background: colorMode === 'dark' ? 'gray.800' : 'white',
        },
      };
    },
  },
});
