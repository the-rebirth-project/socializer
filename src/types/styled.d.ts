import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primary2: string;
      secondary: string;
      secondary2: string;
      tertiary: string;
      background: string;
      cardBackground: string;
      textColor: string;
    };
  }
}
