import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    border: '2px solid',
    borderColor: 'primary.500', // Using a color from the theme
    borderRadius: '.7rem',
    bg: 'yellow',
    _focus: {
      boxShadow: 'none',
      borderColor: 'primary.600', // Adjust for focus state
    },
    _hover: {
      borderColor: 'primary.400', // Adjust for hover state
    },
  },
});

export const inputStyle = defineMultiStyleConfig({ baseStyle });
