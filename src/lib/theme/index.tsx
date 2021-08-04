import React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#038f8f',
    },
    secondary: {
      main: '#bd322f',
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
