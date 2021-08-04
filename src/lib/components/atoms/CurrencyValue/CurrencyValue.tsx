import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { IExchangeRate } from 'types';
import { formatMoneySpaces } from 'helpers';

interface IProps {
  currency?: IExchangeRate;
  number?: string | number | null;
  value?: number | string;
}

export const CurrencyValue: React.FC<IProps> = ({ currency, number, value }) => {
  const classes = useStyles();
  if (currency)
    return (
      <Typography className={classes.value}>
        {value ?? formatMoneySpaces(((Number(number ?? 0) / currency.exchange) * currency.scale).toFixed(2))}
      </Typography>
    );

  return <Typography className={classes.value}>{value}</Typography>;
};

const useStyles = makeStyles(() =>
  createStyles({
    value: {
      paddingLeft: 10,
      fontSize: 18,
      fontWeight: 700,
    },
  }),
);
