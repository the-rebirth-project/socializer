import React from 'react';
import { createGlobalStyle } from 'styled-components';

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
    <div className='App'>
      <GlobalStyle />
      <header className='App-header'>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
