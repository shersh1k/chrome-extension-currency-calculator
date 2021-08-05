import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';
import clsx from 'clsx';

import { IExchangeRate, NamingTypes } from 'types';
import { getName } from 'helpers';

interface IProps {
  currency?: IExchangeRate;
  naming?: NamingTypes;
  name?: string;
  scale?: boolean;
  disablePortal?: boolean;
}

export const CurrencyName: React.FC<IProps> = ({ currency, naming, scale, name, disablePortal }) => {
  const { abbreviation, conversion } = useStyles();
  if (currency && naming)
    return (
      <Tooltip
        PopperProps={{ disablePortal }}
        placement="left"
        title={currency.conversion ? 'Курс при конвертации через основную валюту банка' : ''}
      >
        <Typography className={clsx(abbreviation, currency.conversion && conversion)}>
          {scale && currency.scale} {getName(currency, naming)}
          {currency.conversion && <SyncProblemIcon color="secondary" />}:
        </Typography>
      </Tooltip>
    );

  return <Typography className={abbreviation}>{name}</Typography>;
};

const useStyles = makeStyles(() =>
  createStyles({
    abbreviation: {
      display: 'flex',
      alignItems: 'center',
    },
    conversion: {
      cursor: 'help',
    },
  }),
);
