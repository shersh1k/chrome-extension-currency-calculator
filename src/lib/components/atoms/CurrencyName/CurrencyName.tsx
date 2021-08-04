import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';

import { IExchangeRate, NamingTypes } from 'types';
import { getName } from 'helpers';

interface IProps {
  currency?: IExchangeRate;
  naming?: NamingTypes;
  name?: string;
  scale?: boolean;
}

export const CurrencyName: React.FC<IProps> = ({ currency, naming, scale, name }) => {
  const classes = useStyles();
  if (currency && naming)
    return (
      <Typography
        className={`${classes.abbreviation}${currency.conversion ? ` ${classes.conversion}` : ''}`}
        title={currency.conversion ? 'Курс при конвертации через основную валюту банка' : undefined}
      >
        {scale && currency.scale} {getName(currency, naming)}
        {currency.conversion && <SyncProblemIcon color="secondary" />}:
      </Typography>
    );

  return <Typography className={classes.abbreviation}>{name}</Typography>;
};

const useStyles = makeStyles(() =>
  createStyles({
    abbreviation: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 18,
    },
    conversion: {
      cursor: 'help',
    },
  }),
);
