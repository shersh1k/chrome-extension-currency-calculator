import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Api } from 'API';
import { IExchangeRate } from 'types';
import { appActions, optionsSelectors, appSelectors } from 'contentScriptCore';
import { ChooseCurrencySelection, DatePicker } from 'molecules';
import { CurrencyName, CurrencyRow, CurrencyValue } from 'atoms';

import { popoverContainer } from '../../reactContainer';

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

  const handleChangeDate = (date: Date | null) => {
    dispatch(appActions.setDate({ date }));
  };

  const handleChangeCurrency = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    dispatch(appActions.setCurrency({ currency: (event.target as HTMLInputElement).value }));
  };

  const handleClearDate = () => dispatch(appActions.setDate({ date: new Date() }));

  useEffect(() => {
    if (!currency) return;

    Api.getExchangeRates(api, date).then((loadedRates) => {
      const favoriteRates = loadedRates.filter((item) => [api, ...favorites].find((fav) => item.abbreviation === fav));
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
  }, [api, favorites, date, currency]);

  if (number === null || currency === null) return null;

  if (error) return <div className={classes.root}>{error}</div>;

  return (
    <div className={classes.root}>
      <DatePicker date={date} onChange={handleChangeDate} clearDate={handleClearDate} container={popoverContainer} />
      <CurrencyRow>
        <ChooseCurrencySelection
          api={api}
          favorites={favorites}
          choosedCurrency={currency}
          handleChooseCurrency={handleChangeCurrency}
          container={popoverContainer}
        />
        <TextField
          className={classes.textFieldStyled}
          fullWidth
          size="small"
          type="number"
          value={number ?? 0}
          onChange={hanldeChangeNumber}
        />
      </CurrencyRow>
      <div className={classes.exchangeResults}>
        {rates.map((item) => (
          <CurrencyRow key={item.id}>
            <CurrencyName currency={item} naming={naming} />
            <CurrencyValue currency={item} number={number} />
          </CurrencyRow>
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
    textFieldStyled: {
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
    exchangeResults: {
      paddingTop: 10,
    },
  }),
);
