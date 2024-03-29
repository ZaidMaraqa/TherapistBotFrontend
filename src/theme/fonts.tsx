import React from 'react';
import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
    @font-face {
      font-family: 'Brown';
      font-display: swap;
      src: url('/fonts/Brown-Light.otf') format('opentype');
      font-weight: 100;
    }
    @font-face {
      font-family: 'Brown';
      font-display: swap;
      src: url('/fonts/Brown-Regular.otf') format('opentype');
      font-weight: 400;
    }
    @font-face {
      font-family: 'Brown';
      font-display: swap;
      src: url('/fonts/BrownPro-Bold.ttf') format('truetype');
      font-weight: 700;
    }
  `}
  />
);

export default Fonts;
