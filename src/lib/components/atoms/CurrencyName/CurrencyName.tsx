import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';

import { IExchangeRate, NamingTypes } from 'types';
import { getName } from 'helpers';

interface IProps {
  currency: IExchangeRate;
  naming: NamingTypes;
}

export const CurrencyName: React.FC<IProps> = ({ currency, naming }) => {
  const classes = useStyles();

  return (
    <span className={classes.abbreviation} title={currency.conversion ? 'Курс при конвертации' : undefined}>
      {getName(currency, naming)}
      {currency.conversion && <SyncProblemIcon color="secondary" />}:
    </span>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    abbreviation: {
      color: 'black',
      fontSize: 18,
    },
  }),
);
