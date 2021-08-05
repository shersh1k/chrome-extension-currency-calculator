import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const PRIMARY_COLOR = '#038f8f';
const SECONDARY_COLOR = '#bd322f';

export const theme = createTheme({
  typography: {
    htmlFontSize: 16,
    ...{ pxToRem: (size: number) => `${size}px` }, // hack for disable rem
  },
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
    type: 'dark',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
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
            '-webkit-appearance': 'none',
            '-moz-appearance': 'none',
            margin: 0,
          },
          '&[type=number]': {
            '-webkit-appearance': 'textfield',
            '-moz-appearance': 'textfield',
          },
        },
        '*': {
          '&::-webkit-scrollbar': {
            width: 12,
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: 10,
            '-webkit-box-shadow': `inset 0 0 6px ${PRIMARY_COLOR}`,
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 10,
            backgroundColor: `${SECONDARY_COLOR}C0`,
            // '-webkit-box-shadow': `inset 0 0 6px ${SECONDARY_COLOR}`,
          },
        },
      },
    },
  },
});

export const Theme: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
