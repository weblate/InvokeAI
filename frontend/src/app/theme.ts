import { extendTheme } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';

/**
 * Chakra compiles the theme here to CSS.
 *
 * Custom classes can be added as keys, use the CSS selector
 * as the object key.
 */

// Color mode
const initialColorMode = 'dark';
const useSystemColorMode = false; // always start in dark mode

// Tooltip text color was weird for some reason, fixing it here
const tooltipTextColor = {
  dark: 'gray.800',
  light: 'gray.100',
};

// Node/module colors
const nodeBackgroundColor = {
  dark: 'gray.800',
  light: 'rgb(253, 252, 252)',
};

const nodeBorderColor = {
  dark: 'blue.800',
  light: 'blue.200',
};

const nodeHeaderBackgroundColor = {
  dark: 'gray.700',
  light: 'gray.100',
  selected: {
    dark: 'blue.700',
    light: 'blue.100',
  },
};

const nodeDropShadow = {
  dark: 'drop-shadow(2px 2px 15px rgba(255,255,255,0.08))',
  light: 'drop-shadow(2px 2px 15px rgba(0,0,0,0.08))',
};

// Handles
const handleDropShadow = {
  dark: `drop-shadow(1px 1px 4px rgba(255,255,255,0.2))`,
  light: `drop-shadow(1px 1px 4px rgba(0,0,0,0.2))`,
};
const handleSize = 1.5;
const handleSizeUnit = 'rem';
const handleSizeString = `${handleSize}${handleSizeUnit}`;
const handleWidth = `${handleSize / 2}${handleSizeUnit}`;
const handleHeight = `${handleSize}${handleSizeUnit}`;

// Offset from the edge of the node
const handleOffset = `-${handleSize - 0.2}${handleSizeUnit}`;

// Colors for datatypes, used for color Legend, handles, connection lines
const dataTypeColors = {
  string: {
    dark: 'blue.500',
    light: 'blue.400',
  },
  image: {
    dark: 'green.500',
    light: 'green.400',
  },
  integer: {
    dark: 'yellow.500',
    light: 'yellow.400',
  },
  number: {
    dark: 'orange.500',
    light: 'orange.400',
  },
  boolean: {
    dark: 'pink.500',
    light: 'pink.400',
  },
};

// Accordion styling
const accordionButtonFontWeight = 'bold';
const accordionButtonHoverBgColor = {
  dark: 'rgba(255,255,255,0.05)',
  light: 'rgba(0,0,0,0.05)',
};

// FormLabel styling
const formLabelFontWeight = 'light';

// Gallery HoverableImage icon buttons
const hoverableImageIconButton = {
  background: {
    dark: 'blackAlpha.700',
    light: 'whiteAlpha.800',
  },
  color: {
    dark: 'whiteAlpha.700',
    light: 'blackAlpha.700',
  },
  hover: {
    background: {
      dark: 'blackAlpha.800',
      light: 'whiteAlpha.800',
    },
    color: {
      dark: 'whiteAlpha.900',
      light: 'blackAlpha.900',
    },
  },
};

// Connection lines
const connectionLineWidth = 5;
const connectionLineWidthHover = 7;
const connectionLineWidthString = `${connectionLineWidth}px`;
const connectionLineWidthHoverString = `${connectionLineWidthHover}px`;
const connectionLineDropShadow = {
  dark: `drop-shadow(1px 1px 4px rgba(255,255,255,0.3))`,
  light: `drop-shadow(1px 1px 4px rgba(0,0,0,0.3))`,
};

export const theme = extendTheme({
  config: {
    initialColorMode,
    useSystemColorMode,
  },
  components: {
    Tooltip: {
      baseStyle: (props: StyleFunctionProps) => ({
        textColor: tooltipTextColor[props.colorMode],
      }),
    },
    Accordion: {
      baseStyle: (props: StyleFunctionProps) => ({
        button: {
          fontWeight: accordionButtonFontWeight,
          _hover: {
            bgColor: accordionButtonHoverBgColor[props.colorMode],
          },
        },
        panel: {
          paddingBottom: 2,
        },
      }),
    },
    FormLabel: {
      baseStyle: {
        fontWeight: formLabelFontWeight,
      },
    },
    Button: {
      variants: {
        imageHoverIconButton: (props: StyleFunctionProps) => {
          const { colorMode } = props;
          return {
            bg: hoverableImageIconButton.background[colorMode],
            color: hoverableImageIconButton.color[colorMode],
            _hover: {
              bg: hoverableImageIconButton.hover.background[colorMode],
              color: hoverableImageIconButton.hover.color[colorMode],
            },
          };
        },
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
          // filter: nodeDropShadow[colorMode],
          // background: nodeBackgroundColor[colorMode],
          //   shadow:
          //     colorMode === 'dark'
          //       ? '2px 2px 19px 0px rgba(255,255,255,0.08)'
          //       : '2px 2px 19px 0px rgba(0,0,0,0.08)',
        },
        'path.react-flow__connection-path': {
          strokeWidth: connectionLineWidthString,
          filter: connectionLineDropShadow[colorMode],
        },
        '.invoke-ai__edge path': {
          strokeWidth: connectionLineWidthString,
          filter: connectionLineDropShadow[colorMode],
          _hover: {
            strokeWidth: connectionLineWidthHoverString,
          },
        },
        '.invoke-ai__edge_string path': {
          stroke: dataTypeColors.string[colorMode],
        },
        '.invoke-ai__edge_image path': {
          stroke: dataTypeColors.image[colorMode],
        },
        '.invoke-ai__edge_integer path': {
          stroke: dataTypeColors.integer[colorMode],
        },
        '.invoke-ai__edge_number path': {
          stroke: dataTypeColors.number[colorMode],
        },
        '.invoke-ai__edge_boolean path': {
          stroke: dataTypeColors.boolean[colorMode],
        },
        '.invoke-ai__handle': {
          width: handleWidth,
          height: handleHeight,
          border: 'none',
          filter: handleDropShadow[colorMode],
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
          background: dataTypeColors.string[colorMode],
        },
        '.invoke-ai__handle_image': {
          background: dataTypeColors.image[colorMode],
        },
        '.invoke-ai__handle_integer': {
          background: dataTypeColors.integer[colorMode],
        },
        '.invoke-ai__handle_number': {
          background: dataTypeColors.number[colorMode],
        },
        '.invoke-ai__handle_boolean': {
          background: dataTypeColors.boolean[colorMode],
        },
        '.ivoke-ai__module': {
          filter: nodeDropShadow[colorMode],
          background: nodeBackgroundColor[colorMode],
        },
        '.ivoke-ai__module.selected': {
          borderColor: nodeBorderColor[colorMode],
        },
        '.invoke-ai__module_header': {
          background: nodeHeaderBackgroundColor[colorMode],
        },
        '.invoke-ai__module_header.selected': {
          background: nodeHeaderBackgroundColor.selected[colorMode],
        },
      };
    },
  },
});
