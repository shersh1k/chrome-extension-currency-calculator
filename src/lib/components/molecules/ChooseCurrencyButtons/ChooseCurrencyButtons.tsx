import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
    <ButtonGroup className={classes.chooseCurrency} orientation="vertical" variant="outlined">
      {[api, ...favorites].map((item) => (
        <ChooseCurrencyButton currency={item} key={item} onClick={handleChooseCurrency} />
      ))}
    </ButtonGroup>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    chooseCurrency: {
      padding: 5,
    },
  }),
);
