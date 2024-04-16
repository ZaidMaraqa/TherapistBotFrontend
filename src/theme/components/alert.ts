import { AlertProps } from '@chakra-ui/react';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import { alertAnatomy } from '@chakra-ui/anatomy';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys);

const baseStyle = definePartsStyle((props: AlertProps) => {
    const status = props.status || 'success';

  const bg = 'primary';
  const iconColor = 'white';
  const textColor = 'white';

  const statusStyles = {
    success: {
      container: {
        px: '1rem',
        py: '0.75rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        background: bg,
        color: textColor,
        _first: {
          color: textColor,
        },
      },
      description: {
        color: textColor,
        fontWeight: 400,
        fontSize: '0.75rem',
      },
      icon: {
        color: iconColor,
      },
    },
    error: {
      container: {
        px: '1rem',
        py: '0.75rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        background: bg,
        color: textColor,
        _first: {
          color: textColor,
        },
      },
      description: {
        color: textColor,
        fontWeight: 400,
        fontSize: '0.75rem',
      },
      icon: {
        color: iconColor,
      },
    },
  };

  const style = statusStyles[status as keyof typeof statusStyles];

  return style;
});

export const AlertStyles = defineMultiStyleConfig({ baseStyle });