import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useUserDispatch, setUser } from './contexts/UserContext';
import { Routes } from './Routes';

const GlobalStyle = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: inherit;
    margin: 0;
    -webkit-tap-highlight-color: inherit;
  }

  html, body {
    font-size: 10px;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
    margin: 0;
    -webkit-tap-highlight-color: transparent;
  }
`;

const App: React.FC = () => {
  const dispatch = useUserDispatch();

  useEffect(() => {
    setUser(dispatch);
  }, [dispatch]);

  return (
    <div>
      <GlobalStyle />
      <Routes />
    </div>
  );
};

export default App;
