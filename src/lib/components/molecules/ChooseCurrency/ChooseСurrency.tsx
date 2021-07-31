import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ButtonGroup } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { optionsSelectors } from 'selectors';
import { appActions } from 'actions';
import { ChooseCurrencyButton } from 'atoms';

export const ChooseCurrency: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const favorites = useSelector(optionsSelectors.getFavorites);

  const handleChooseCurrency = (currency: string) => {
    dispatch(appActions.setCurrency({ currency }));
  };

  return (
    <ButtonGroup className={classes.chooseCurrency} orientation="vertical" variant="contained" color="primary">
      {favorites.map((item) => (
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
