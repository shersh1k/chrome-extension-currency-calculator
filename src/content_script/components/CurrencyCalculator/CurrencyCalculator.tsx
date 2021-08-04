import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import { Api } from 'API';
import { CurrencyName, CurrencyRow, CurrencyValue } from 'atoms';
import { ChooseCurrencySelection, DatePicker } from 'molecules';
import { IExchangeRate } from 'types';
import { optionsSelectors } from 'commonCore';
import { appActions, appSelectors } from 'contentScriptCore';

import { popoverContainer } from '../../reactContainer';

export const CurrencyCalculator: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const api = useSelector(optionsSelectors.getApi);
  const naming = useSelector(optionsSelectors.getNaming);
  const favorites = useSelector(optionsSelectors.getFavorites);
  const currency = useSelector(appSelectors.getCurrency);
  const number = useSelector(appSelectors.getNumber);
  const date = useSelector(appSelectors.getDate);

  const [rates, setRates] = useState<IExchangeRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const hanldeChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(appActions.setNumber({ number: event.target.value }));
  };

  const handleChangeDate = (newDate: Date | null) => {
    dispatch(appActions.setDate({ date: newDate }));
  };

  const handleChangeCurrency = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    dispatch(appActions.setCurrency({ currency: (event.target as HTMLInputElement).value }));
  };

  const handleClearDate = () => dispatch(appActions.setDate({ date: new Date() }));

  useEffect(() => {
    if (!api || !favorites) return;
    if (!currency) return;
    setError(false);
    setLoading(true);
    setRates([]);

    Api.getExchangeRates(api, date)
      .then((loadedRates) => {
        const favoriteRates = [api, ...favorites]
          .map((favorite) => loadedRates.find((loaded) => favorite === loaded.abbreviation))
          .filter((item) => item !== undefined) as IExchangeRate[];

        if (currency === api) return setRates(favoriteRates);
        const conversionCurrency = loadedRates.find((item) => item.abbreviation === currency);
        if (!conversionCurrency) return;
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
            .map((item) => ({
              ...item,
              exchange: (item.exchange / exchange) * scale,
              conversion: true,
            })),
        ];
        setRates(conversionRates);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [api, favorites, date, currency]);

  if (api === null || favorites === null || naming === null) return null;
  if (number === null || currency === null) return null;

  if (error) return <div className={classes.root}>{error}</div>;

  return (
    <div className={classes.root}>
      <DatePicker clearDate={handleClearDate} container={popoverContainer} date={date} onChange={handleChangeDate} />
      <CurrencyRow>
        <ChooseCurrencySelection
          api={api}
          choosedCurrency={currency}
          container={popoverContainer}
          favorites={favorites}
          handleChooseCurrency={handleChangeCurrency}
        />
        <TextField
          className={classes.textFieldStyled}
          size="small"
          type="number"
          value={number ?? 0}
          onChange={hanldeChangeNumber}
        />
      </CurrencyRow>
      {loading && 'Загрузка курсов...'}
      {error && 'Ошибка получения курсов валют, попробуйте выбрать другую дату, или повторить запрос позже'}
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

const useStyles = makeStyles(() =>
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
