import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const CurrencyRow: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.row}>{children}</div>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
      borderBottom: `2px solid ${theme.palette.divider}`,
    },
  }),
);
