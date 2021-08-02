import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { formatMoneySpaces } from 'helpers';
import { IExchangeRate } from 'types';

interface IProps {
  currency: IExchangeRate;
  number?: string | number;
}

export const CurrencyValue: React.FC<IProps> = ({ currency, number }) => {
  const classes = useStyles();

  return (
    <span className={classes.value}>
      {formatMoneySpaces(((Number(number ?? 0) / currency.exchange) * currency.scale).toFixed(2))}
    </span>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    value: {
      paddingLeft: 10,
      fontSize: 18,
      fontWeight: 700,
      position: 'relative',
      color: 'black',
    },
  }),
);
