import { useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import RuneScape07 from "./fonts/RuneScape-Chat-Bold-07.woff";
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: "runescape_uf",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'RuneScape07';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('RuneScape07'), url(${RuneScape07}) format('woff');
            unicodeRange: U+0030-0039, U+0041-005A, U+0061-007A;
          }
        `,
      },
    },
  });

  return(
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <LoginScreen/>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
