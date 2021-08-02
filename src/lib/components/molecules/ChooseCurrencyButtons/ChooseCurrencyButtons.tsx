import React from 'react';

import { ButtonGroup } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { ChooseCurrencyButton } from 'atoms';
import { ApiTypes } from 'types';

interface IProps {
  api: ApiTypes;
  favorites: string[];
  handleChooseCurrency: (currency: string) => void;
}

export const ChooseCurrencyButtons: React.FC<IProps> = ({ api, favorites, handleChooseCurrency }) => {
  const classes = useStyles();

  return (
    <ButtonGroup className={classes.chooseCurrency} orientation="vertical" variant="contained" color="primary">
      {[api, ...favorites].map((item) => (
        <ChooseCurrencyButton key={item} currency={item} onClick={handleChooseCurrency} />
      ))}
    </ButtonGroup>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chooseCurrency: {
      border: '1px solid grey',
      borderRadius: 10,
      background: 'white',
      overflow: 'hidden',
      padding: 10,
    },
  }),
);
