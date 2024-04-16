import { Theme, extendTheme, baseTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { inputStyle } from './components/input';
import { AlertStyles } from './components/alert';





const activeLabelStyles = {
  transform: "scale(0.875) translateY(-30px) translateX(-20px)",
  backgroundColor: "white",
  zIndex: 2,
};


export const theme: Theme = extendTheme(
  {
    styles: {
      global: {
        // 'html, body': {
        //   backgroundColor: 'base',
        //   cursor: 'default',
        //   color: 'white',
        // },
        // body: {
        //   color: 'text',
        //   scrollbarWidth: 'thin',
        //   height: '100vh',
        // },
        // '::-webkit-scrollbar': {
        //   width: '0.3125rem',
        //   height: '0.3125rem',
        //   backgroundColor: '#4F5B8F',
        // },

        // '::-webkit-scrollbar-thumb': {
        //   background: 'rgba(217, 217, 217, 0.80)',
        //   borderRadius: '7.5rem',
        // },
      },
    },
    colors: {
      green: {
        ...baseTheme.colors.green,
        200: '#25C34C',
      },
      primary: {
        '50': '#231E5B',
        '100': '#231E5B',
        '200': '#231E5B',
        '300': '#231E5B',
        '400': '#231E5B',
        '500': '#231E5B',
        '600': '#231E5B',
        '700': '#231E5B',
        '800': '#231E5B',
        '900': '#231E5B',
      },
      secondary: {
        '50': '#5F6B99',
        '100': '#5F6B99',
        '200': '#5F6B99',
        '300': '#5F6B99',
        '400': '#5F6B99',
        '500': '#5F6B99',
        '600': '#5F6B99',
        '700': '#5F6B99',
        '800': '#5F6B99',
        '900': '#5F6B99',
      },
    },
    semanticTokens: {
      colors: {
        text: 'white',
        primary: '#231E5B',
        base: '#161B43',
        accent: '#5F6B9938',
        secondary: '#4A5A89',
        light: '#F0F0EE',
        dark: '#2A3640',
      },
    },
    fonts: {
      heading: "'Brown', -apple-system, system-ui, sans-serif",
      body: "'Brown', -apple-system, system-ui, sans-serif",
    },
    components: {
      Input: inputStyle,
      Form: {
        variants: {
          floating: {
            container: {
              _focusWithin: {
                label: {
                  ...activeLabelStyles,
                },
              },
              "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label": {
                ...activeLabelStyles,
              },
              label: {
                position: "absolute",
                left: "2rem",
                top: "10px",
                transition: "all 0.2s",
                transformOrigin: "left top",
                mx: 3,
                px: 1,
                my: 2,
                pointerEvents: "none",
              },
            },
          },
        },
      },
      Alert: AlertStyles,
    },
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
  },
  withDefaultColorScheme({ colorScheme: 'primary' }),
) as Theme;