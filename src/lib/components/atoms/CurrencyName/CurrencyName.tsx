import React from 'react';

import { makeStyles } from '@mui/styles';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import { IExchangeRate, NamingTypes } from 'types';
import { getName } from 'helpers';

interface IProps {
  onClick?: (string?: string) => void;
  currency?: IExchangeRate;
  naming?: NamingTypes;
  name?: string;
  scale?: boolean;
  disablePortal?: boolean;
}

export const CurrencyName: React.FC<IProps> = ({ onClick, currency, naming, scale, name, disablePortal }) => {
  const { abbreviation } = useStyles();

  const handleClick = () => {
    if (onClick) onClick(currency?.abbreviation);
  };

  if (currency && naming)
    return (
      <Tooltip
        PopperProps={{ disablePortal }}
        placement="left"
        title={currency.conversion ? 'Курс при конвертации через основную валюту банка' : ''}
      >
        <Badge badgeContent={currency.conversion ? ' ' : 0} color="secondary" variant="dot">
          {onClick ? (
            <Button className={clsx(abbreviation)} variant="text" onClick={handleClick}>
              {scale && currency.scale} {getName(currency, naming)}
            </Button>
          ) : (
            <Typography className={clsx(abbreviation)}>
              {scale && currency.scale} {getName(currency, naming)}
            </Typography>
          )}
        </Badge>
      </Tooltip>
    );

  return <Typography className={abbreviation}>{name}</Typography>;
};

const useStyles = makeStyles(() => ({
    abbreviation: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);
