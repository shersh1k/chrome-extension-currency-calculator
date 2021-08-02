import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface IProps {}

export const CurrencyRow: React.FC<IProps> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.row}>{children}</div>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }),
);
