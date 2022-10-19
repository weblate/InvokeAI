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
});
