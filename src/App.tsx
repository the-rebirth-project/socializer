import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Routes } from './Routes';

const GlobalStyle = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: inherit;
    margin: 0;
  }

  html, body {
    font-size: 10px;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
    margin: 0;
  }
`;

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <Routes />
    </div>
  );
};

export default App;
