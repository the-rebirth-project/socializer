import React from 'react';
import { Location } from '@reach/router';
import { Routes } from './Routes';
import { createGlobalStyle } from 'styled-components';
import { device } from './utils/responsive';

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
    background-color: ${(props) => props.theme.colors.background};
    overflow: hidden;

    @media ${device.laptop} {
      font-size: 10.5px;
    }

    @media ${device.laptopL} {
      font-size: 13px;
    }

    @media ${device.desktop} {
      font-size: 16px;
    }
  }
`;

export const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <Location>{({ location }) => <Routes location={location} />}</Location>
    </div>
  );
};
