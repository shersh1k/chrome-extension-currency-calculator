import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';

export const CurrencyRow: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.row}>{children}</div>;
};

const useStyles = makeStyles(() =>
  createStyles({
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }),
);
