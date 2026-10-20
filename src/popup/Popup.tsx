import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';

import { CurrencyName, CurrencyRow, CurrencyValue, OptionsButton } from 'atoms';
import { ChooseCurrencySelection, DatePicker, HonestPrice } from 'molecules';
import { IExchangeRate } from 'types';
import { getOptionsFromStorage, setOptionsToStorage, getOptionsFromChanges } from 'storage';
import { formatMoneySpaces, getCalculatedRates, getSelectedNumber } from 'helpers';
import { optionsActions, optionsSelectors } from 'commonCore';
import { appActions, appSelectors } from 'popupCore';

export const Popup: React.FC = () => {
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

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    dispatch(appActions.setTab({ tab: newValue }));
  };

  const handleChangeCurrency = (event: SelectChangeEvent) => {
    const newCurrency = event.target.value;
    setOptionsToStorage({ latestCurrency: newCurrency });
    dispatch(optionsActions.setLatestCurrency({ latestCurrency: newCurrency }));
  };

  const handleClickCurrency = (abbr?: string) => {
    if (!abbr) return;
    setOptionsToStorage({ latestCurrency: abbr });
    dispatch(optionsActions.setLatestCurrency({ latestCurrency: abbr }));
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

  const saveOptions = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setOptionsToStorage({ isPageTooltip: checked });
  };

  useEffect(() => {
    dispatch(appActions.getExchangeRatesCryptoRequest());

    getOptionsFromStorage((options) => {
      dispatch(optionsActions.setOptions(options));
    });

    getActiveTabSelection().then((selection) => {
      if (selection === undefined) return;
      const newNumber = getSelectedNumber(selection) ?? null;
      dispatch(appActions.setNumber({ number: newNumber || 1 }));
    });

    chrome.storage.onChanged.addListener(storageChangeListener);

    function storageChangeListener(changes: { [key: string]: chrome.storage.StorageChange }) {
      dispatch(optionsActions.setOptions(getOptionsFromChanges(changes)));
    }

    return () => {
      chrome.storage.onChanged.removeListener(storageChangeListener);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(appActions.getExchangeRatesRequest());
  }, [dispatch, api, date]);

  useEffect(() => {
    setCurrencys(exchangeRates.filter((item) => favorites.find((favorite) => item.abbreviation === favorite)));

    const newRates = getCalculatedRates(exchangeRates, api, favorites, currency);
    setRates(newRates ?? []);
  }, [exchangeRates, currency, api, favorites]);

  if (api === null || favorites === null || isPageTooltip === null || naming === null) return null;

  return (
    <Box
      sx={{
        width: 400,
        minHeight: 500,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box component="main" sx={{ flex: 1, width: '100%' }}>
        <AppBar position="sticky">
          <Tabs value={tab} variant="fullWidth" onChange={handleChangeTab}>
            <Tab label="Калькулятор" />
            <Tab label="Курсы валют" />
            <Tab label="Криптовалюты" />
          </Tabs>
        </AppBar>
        <Box hidden={tab !== 0} sx={{ p: 3 }}>
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
              sx={{ '& input': { textAlign: 'right' } }}
              type="number"
              value={number ?? ''}
              variant="standard"
              onChange={hanldeChangeNumber}
              onFocus={hanldeSelectNumber}
            />
          </CurrencyRow>
          {rates.map((item) => (
            <CurrencyRow key={item.id}>
              <CurrencyName currency={item} naming={naming} onClick={handleClickCurrency} />
              <CurrencyValue currency={item} number={number} />
            </CurrencyRow>
          ))}
          <HonestPrice api={api} currency={currency || api} exchangeRates={exchangeRates} number={number} />
          {loading && (
            <Box sx={loaderSx}>
              <CircularProgress />
            </Box>
          )}
        </Box>
        <Box hidden={tab !== 1} sx={{ p: 3 }}>
          <DatePicker clearDate={handleClearDate} date={date} onChange={handleChangeDate} />
          {loading && (
            <Box sx={loaderSx}>
              <CircularProgress />
            </Box>
          )}
          {currencys.map((item) => (
            <CurrencyRow key={item.id}>
              <CurrencyName scale currency={item} naming={naming} />
              <CurrencyValue value={item.exchange.toFixed(4)} />
            </CurrencyRow>
          ))}
        </Box>
        <Box hidden={tab !== 2} sx={{ p: 3 }}>
          {loading && (
            <Box sx={loaderSx}>
              <CircularProgress />
            </Box>
          )}
          {exchangeRatesCrypto.map((item) => (
            <CurrencyRow key={item.id}>
              <CurrencyName name={`${item.rank}. ${item.name}:`} />
              <CurrencyValue value={`${formatMoneySpaces(Number(item.priceUsd).toFixed(5))} $`} />
            </CurrencyRow>
          ))}
        </Box>
      </Box>
      <Box
        component="footer"
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid grey',
        }}
      >
        <FormControlLabel
          control={<Switch checked={isPageTooltip} color="primary" onChange={saveOptions} />}
          label="Работать на странице"
        />
        <OptionsButton />
      </Box>
    </Box>
  );
};

const loaderSx = {
  minHeight: 90,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const;

// returns undefined when script can't be injected (e.g. chrome:// pages)
async function getActiveTabSelection(): Promise<string | undefined> {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id === undefined) return;

    const [injection] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection()?.toString() ?? '',
    });

    return injection?.result;
  } catch {
    return undefined;
  }
}
