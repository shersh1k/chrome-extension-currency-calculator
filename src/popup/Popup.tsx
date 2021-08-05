import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';

import { CurrencyName, CurrencyRow, CurrencyValue, OptionsButton } from 'atoms';
import { ChooseCurrencySelection, DatePicker } from 'molecules';
import { IExchangeRate } from 'types';
import { getOptionsFromStorage, setOptionsToStorage } from 'storage';
import { formatMoneySpaces, getCalculatedRates, getSelectedNumber } from 'helpers';
import { optionsActions, optionsSelectors } from 'commonCore';
import { appActions, appSelectors } from 'popupCore';

export const Popup: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isPageTooltip = useSelector(optionsSelectors.getIsPageTooltip);
  const api = useSelector(optionsSelectors.getApi);
  const favorites = useSelector(optionsSelectors.getFavorites);
  const naming = useSelector(optionsSelectors.getNaming);
  const currency = useSelector(optionsSelectors.getLatestCurrency);
  const date = useSelector(appSelectors.getDate);
  const number = useSelector(appSelectors.getNumber);
  const tab = useSelector(appSelectors.getTab);
  const exchangeRates = useSelector(appSelectors.getExchangeRates);
  const exchangeRatesCrypto = useSelector(appSelectors.getExchangeRatesCrypto);
  const loading = useSelector(appSelectors.getLoading);

  const [currencys, setCurrencys] = useState<IExchangeRate[]>([]);
  const [rates, setRates] = useState<IExchangeRate[]>([]);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    dispatch(appActions.setTab({ tab: newValue }));
  };

  const handleChangeCurrency = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const newCurrency = (event.target as HTMLInputElement).value;
    setOptionsToStorage({ latestCurrency: newCurrency });
    dispatch(optionsActions.setLatestCurrency({ latestCurrency: newCurrency }));
  };

  const hanldeChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(appActions.setNumber({ number: event.target.value }));
  };

  const hanldeSelectNumber = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.target.select();
  };

  const handleChangeDate = (newDate: Date | null) => {
    dispatch(appActions.setDate({ date: newDate }));
  };

  const handleClearDate = () => {
    dispatch(appActions.setDate({ date: new Date() }));
  };

  const saveOptions = (event: React.ChangeEvent<{}>, checked: boolean) => {
    setOptionsToStorage({ isPageTooltip: checked });
  };

  useEffect(() => {
    dispatch(appActions.getExchangeRatesCryptoRequest());

    getOptionsFromStorage((options) => {
      dispatch(optionsActions.setOptions(options));
    });

    chrome.tabs.executeScript({ code: 'window.getSelection().toString();' }, (selection) => {
      if (!selection) return;
      const newNumber = getSelectedNumber(selection[0]) ?? null;
      dispatch(appActions.setNumber({ number: newNumber || 1 }));
    });

    chrome.storage.onChanged.addListener(storageChangeListener);

    function storageChangeListener(options: { [key: string]: chrome.storage.StorageChange }) {
      dispatch(
        optionsActions.setOptions({
          isPageTooltip: options.isPageTooltip?.newValue,
          api: options.api?.newValue,
          favorites: options.favorites?.newValue,
          naming: options.naming?.newValue,
        }),
      );
    }

    return () => {
      chrome.storage.onChanged.removeListener(storageChangeListener);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!api || !favorites || !currency) return;
    dispatch(appActions.getExchangeRatesRequest());
  }, [dispatch, api, favorites, date, currency]);

  useEffect(() => {
    setCurrencys(exchangeRates.filter((item) => favorites.find((favorite) => item.abbreviation === favorite)));

    const newRates = getCalculatedRates(exchangeRates, api, favorites, currency);
    setRates(newRates ?? []);
  }, [exchangeRates, currency, api, favorites]);

  if (api === null || favorites === null || isPageTooltip === null || naming === null) return null;

  return (
    <div className={classes.root}>
      <main className={classes.main}>
        <AppBar position="sticky">
          <Tabs value={tab} variant="fullWidth" onChange={handleChangeTab}>
            <Tab label="Калькулятор" />
            <Tab label="Курсы валют" />
            <Tab label="Криптовалюты" />
          </Tabs>
        </AppBar>
        <Box hidden={tab !== 0} p={3}>
          <DatePicker clearDate={handleClearDate} date={date} onChange={handleChangeDate} />
          <CurrencyRow>
            <ChooseCurrencySelection
              api={api}
              choosedCurrency={currency || api}
              favorites={favorites}
              handleChooseCurrency={handleChangeCurrency}
            />
            <TextField
              fullWidth
              className={classes.textFieldStyled}
              type="number"
              value={number ?? ''}
              onChange={hanldeChangeNumber}
              onFocus={hanldeSelectNumber}
            />
          </CurrencyRow>
          {loading && 'Загрузка...'}
          {rates.map((item) => (
            <CurrencyRow key={item.id}>
              <CurrencyName currency={item} naming={naming} />
              <CurrencyValue currency={item} number={number} />
            </CurrencyRow>
          ))}
        </Box>
        <Box hidden={tab !== 1} p={3}>
          <DatePicker clearDate={handleClearDate} date={date} onChange={handleChangeDate} />
          {loading && 'Загрузка...'}
          {currencys.map((item) => (
            <CurrencyRow key={item.id}>
              <CurrencyName scale currency={item} naming={naming} />
              <CurrencyValue value={item.exchange.toFixed(4)} />
            </CurrencyRow>
          ))}
        </Box>
        <Box hidden={tab !== 2} p={3}>
          {loading && 'Загрузка...'}
          {exchangeRatesCrypto.map((item) => (
            <CurrencyRow key={item.id}>
              <CurrencyName name={`${item.rank}. ${item.name}:`} />
              <CurrencyValue value={`${formatMoneySpaces(Number(item.priceUsd).toFixed(5))} $`} />
            </CurrencyRow>
          ))}
        </Box>
      </main>
      <footer className={classes.footer}>
        <FormControlLabel
          control={<Switch checked={isPageTooltip} color="primary" onChange={saveOptions} />}
          label="Работать на странице"
        />
        <OptionsButton />
      </footer>
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: 400,
      minHeight: 500,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    main: {
      flex: 1,
      width: '100%',
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textFieldStyled: {
      '& input': {
        textAlign: 'right',
      },
    },
    abbreviation: {
      color: 'black',
    },
    value: {
      paddingLeft: 10,
      fontWeight: 700,
      position: 'relative',
      color: 'black',
    },
    exchangeResults: {
      paddingTop: 10,
    },
    footer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid grey',
    },
  }),
);
