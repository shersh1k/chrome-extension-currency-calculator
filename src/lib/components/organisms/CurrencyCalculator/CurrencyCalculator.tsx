import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';

import { Api } from 'API';
import { IExchangeRate } from 'types';
import { optionsSelectors, appSelectors } from 'selectors';
import { appActions } from 'actions';
import { formatMoneySpaces, getName } from 'helpers';
import { DatePicker } from 'molecules';

interface IСurrencyCalculatorProps {}

export const CurrencyCalculator: React.FC<IСurrencyCalculatorProps> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const api = useSelector(optionsSelectors.getApi);
  const naming = useSelector(optionsSelectors.getNaming);
  const favorites = useSelector(optionsSelectors.getFavorites);
  const currency = useSelector(appSelectors.getCurrency);
  const number = useSelector(appSelectors.getNumber);
  const date = useSelector(appSelectors.getDate);

  const [rates, setRates] = useState<IExchangeRate[]>([]);
  const [error, setError] = useState<false | string>(false);

  const hanldeChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(appActions.setNumber({ number: event.target.value }));
  };

  useEffect(() => {
    if (!currency) return;

    Api.getExchangeRates(api, date).then((loadedRates) => {
      const favoriteRates = loadedRates.filter((item) => favorites.find((fav) => item.abbreviation === fav));
      if (currency === api) return setRates(favoriteRates);
      const conversionCurrency = loadedRates.find((item) => item.abbreviation === currency);
      if (!conversionCurrency) return setError(`В выбранном API отсуствует ${currency}`);
      const { exchange, scale } = conversionCurrency;
      const conversionRates = [
        {
          abbreviation: Api[api].abbreviation,
          exchange: 1 / exchange,
          id: currency,
          name: Api[api].name,
          scale: 1 / scale,
        },
        ...favoriteRates
          .filter((item) => item.abbreviation !== currency)
          .map((item) => {
            item.exchange = (item.exchange / exchange) * scale;
            item.conversion = true;
            return item;
          }),
      ];
      setRates(conversionRates);
    });
  }, [api, favorites, date]);

  if (number === null || currency === null) return null;

  if (error) return <div className={classes.root}>{error}</div>;

  return (
    <div className={classes.root}>
      <DatePicker />
      <div className={classes.row}>
        <span className={classes.abbreviation}>{currency}:</span>
        <TextField
          className={classes.textFieldStyled}
          fullWidth
          size="small"
          type="number"
          value={number ?? 0}
          onChange={hanldeChangeNumber}
        />
      </div>
      <div className={classes.exchangeResults}>
        {rates.map((item) => (
          <div className={classes.row} key={item.id}>
            <span className={classes.abbreviation} title={item.conversion ? 'Курс при конвертации' : undefined}>
              {getName(item, naming)}
              {item.conversion && <SyncProblemIcon color="secondary" />}:
            </span>
            <span className={classes.value}>
              {formatMoneySpaces(((Number(number) / item.exchange) * item.scale).toFixed(2))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 190,
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    textFieldStyled: {
      maxWidth: 150,
      paddingLeft: 10,
      '& input': {
        textAlign: 'right',
        fontSize: 18,
        fontWeight: 700,
        width: 'auto',
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          '-moz-appearance': 'none',
          margin: 0,
        },
        '&[type=number]': {
          '-webkit-appearance': 'textfield',
          '-moz-appearance': 'textfield',
        },
      },
    },
    abbreviation: {
      color: 'black',
      fontSize: 18,
      display: 'flex',
      alignItems: 'center',
    },
    value: {
      paddingLeft: 10,
      fontSize: 18,
      fontWeight: 700,
      position: 'relative',
      color: 'black',
    },
    exchangeResults: {
      paddingTop: 10,
    },
  }),
);
