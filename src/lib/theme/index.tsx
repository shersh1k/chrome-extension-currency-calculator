import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const PRIMARY_COLOR = '#038f8f';
const SECONDARY_COLOR = '#bd322f';

export const theme = createTheme({
  typography: {
    htmlFontSize: 16,
    ...{ pxToRem: (size: number) => `${size}px` }, // hack for disable rem
  },
  palette: {
    mode: 'dark',
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#424242',
          color: 'white',
        },
        '#shersh1k_currency_calculator_react_root': {
          backgroundColor: '#424242',
          color: 'white',
          border: `1px solid #202020`,
          borderRadius: 10,
          overflow: 'hidden',
        },
        input: {
          '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            margin: 0,
          },
          '&[type=number]': {
            WebkitAppearance: 'textfield',
            MozAppearance: 'textfield',
          },
        },
        '*': {
          '&::-webkit-scrollbar': {
            width: 12,
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: 10,
            WebkitBoxShadow: `inset 0 0 6px ${PRIMARY_COLOR}`,
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 10,
            backgroundColor: `${SECONDARY_COLOR}C0`,
          },
        },
      },
    },
  },
});

export const Theme: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
