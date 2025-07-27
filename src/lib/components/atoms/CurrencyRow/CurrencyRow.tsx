import React from 'react';

import { makeStyles } from '@mui/styles';

export const CurrencyRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.row}>{children}</div>;
};

const useStyles = makeStyles((theme: any) => ({
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderBottom: `2px solid ${theme.palette?.divider}`,
  },
}));
