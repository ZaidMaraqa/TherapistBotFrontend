import { Theme, extendTheme, withDefaultColorScheme, baseTheme } from '@chakra-ui/react';


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
        '50': '#4699B7',
        '100': '#4699B7',
        '200': '#4699B7',
        '300': '#4699B7',
        '400': '#4699B7',
        '500': '#4699B7',
        '600': '#4699B7',
        '700': '#4699B7',
        '800': '#4699B7',
        '900': '#4699B7',
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
        primary: '#4699B7',
        base: '#161B43',
        accent: '#5F6B9938',
        secondary: '#4A5A89',
        light: '#F0F0EE',
        dark: '#2A3640',
        greenMint: '#93FFDE',
      },
    },
    fonts: {
      heading: "'Brown', -apple-system, system-ui, sans-serif",
      body: "'Brown', -apple-system, system-ui, sans-serif",
    },
    components: {
    },
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
  },
//   withDefaultColorScheme({ colorScheme: 'primary' }),
) as Theme;