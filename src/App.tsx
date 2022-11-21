import FormWrapper from './components/FormWrapper';
import RuneScape07 from "./fonts/Runescape-Plain-12.woff";
import RuneScape07Bold from "./fonts/Runescape-Bold-12.woff";
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Configuration from './components/Configuration';

function App() {

  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'RuneScape07';
            font-style: normal;
            font-display: swap;
            font-weight: regular;
            src: local('RuneScape07'), url(${RuneScape07}) format('woff');
            unicodeRange: U+0030-0039, U+0041-005A, U+0061-007A;
          }
          @font-face {
            font-family: 'RuneScape07Bold';
            font-style: normal;
            font-display: swap;
            font-weight: regular;
            src: local('RuneScape07Bold'), url(${RuneScape07Bold}) format('woff');
            unicodeRange: U+0030-0039, U+0041-005A, U+0061-007A;
          }
        `,
      },
    },
  });

  return(
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Configuration>
          <FormWrapper/>
        </Configuration>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
