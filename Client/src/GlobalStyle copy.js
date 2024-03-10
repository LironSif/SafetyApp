// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Inter';
    src: url('./assets/Fonts/static/Inter-Regular.ttf') format('woff2'),
         url('./assets/Fonts/static/Inter-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Inter';
    src: url('./assets/Fonts/static/Inter-Bold.woff2') format('woff2'),
         url('./assets/Fonts/static/Inter-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }
  
  body {
      width: 100%;
      min-height: 100vh;
      background-color: #f8f9fa;
      font-family: 'Inter', sans-serif;
  }
`;

export default GlobalStyle;
