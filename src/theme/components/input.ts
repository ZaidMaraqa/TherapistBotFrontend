import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    border: '.125rem solid',
    borderColor: 'primary',
    borderRadius: '1rem',
    height: '3.75rem',
    _focus: {
      boxShadow: 'none',
      borderColor: 'primary.600',
    },
    _hover: {
      borderColor: 'primary.400', 
    },
  },
});

export const inputStyle = defineMultiStyleConfig({ baseStyle });
