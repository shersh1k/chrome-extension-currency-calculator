import React, { useEffect, useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, FormControlLabel, Switch, TextField, Tabs, Tab, Box } from '@material-ui/core';

import { CurrencyName, CurrencyRow, CurrencyValue, OptionsButton } from 'atoms';
import { Api } from 'API';
import { setOptionsToStorage } from 'storage';
import { ApiTypes, IExchangeRate, NamingTypes } from 'types';
import { formatMoneySpaces, getName } from 'helpers';
import { ChooseCurrencySelection, DatePicker } from 'molecules';

interface IProps {
  isPageTooltip: boolean;
  api: ApiTypes;
  favorites: string[];
  naming: NamingTypes;

  number?: number;
}

export const Popup: React.FC<IProps> = ({
  isPageTooltip: initialIsPageTooltip,
  api,
  favorites,
  naming,
  number: initialNumber,
}) => {
  const classes = useStyles();

  const [isPageTooltip, setIsPageTooltip] = useState<boolean>(initialIsPageTooltip);
  const [currencys, setCurrencys] = useState<IExchangeRate[]>([]);
  const [number, setNumber] = useState<string | number | undefined>(initialNumber);
  const [date, setDate] = useState<Date>(new Date());
  const [currentTab, setCurrentTab] = useState(initialNumber ? 1 : 0);
  const [choosedCurrency, setChoosedCurrency] = useState<string>(api);
  const [error, setError] = useState<false | string>(false);
  const [rates, setRates] = useState<IExchangeRate[]>([]);
  const [cryproRates, setCryptoRates] = useState<any[]>([]);

  const handleChangeCurrency = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    setChoosedCurrency((event.target as HTMLInputElement).value);
  };

  const hanldeChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  const handleChangeDate = (date: Date | null) => {
    if (date) setDate(date);
  };

  const handleClearDate = () => setDate(new Date());

  const saveOptions = (event: React.ChangeEvent<{}>, checked: boolean) => {
    setIsPageTooltip(checked);
    setOptionsToStorage({ isPageTooltip: checked });
  };

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    fetch('https://api.coincap.io/v2/assets')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCryptoRates(
          res.data.slice(0, 10).map((item: any) => ({
            abbreviation: item.symbol,
            id: item.id,
            name: item.name,
            priceUsd: item.priceUsd,
            rank: item.rank,
          })),
        );
      });
  }, []);

  useEffect(() => {
    Api.getExchangeRates(api, date).then((loadedRates) => {
      const favoriteRates = loadedRates.filter((item) => favorites.find((fav) => item.abbreviation === fav));
      if (choosedCurrency === api) return setRates(favoriteRates);
      const conversionCurrency = loadedRates.find((item) => item.abbreviation === choosedCurrency);
      if (!conversionCurrency) return setError(`В выбранном API отсуствует ${choosedCurrency}`);
      const { exchange, scale } = conversionCurrency;
      const conversionRates = [
        {
          abbreviation: Api[api].abbreviation,
          exchange: 1 / exchange,
          id: choosedCurrency,
          name: Api[api].name,
          scale: 1 / scale,
        },
        ...favoriteRates
          .filter((item) => item.abbreviation !== choosedCurrency)
          .map((item) => {
            item.exchange = (item.exchange / exchange) * scale;
            item.conversion = true;
            return item;
          }),
      ];
      setRates(conversionRates);
    });
  }, [api, favorites, date, choosedCurrency]);

  useEffect(() => {
    Api.getExchangeRates(api, date).then((rates) => {
      setCurrencys(rates.filter((item) => favorites.find((favorite) => item.abbreviation === favorite)));
    });
  }, [api, date, favorites]);

  return (
    <div className={classes.root}>
      <main className={classes.main}>
        <AppBar position="static">
          <Tabs value={currentTab} variant="fullWidth" onChange={handleChangeTab} aria-label="simple tabs example">
            <Tab label="Курсы валют" />
            <Tab label="Калькулятор" />
            <Tab label="Криптовалюты" />
          </Tabs>
        </AppBar>
        <Box hidden={currentTab !== 0} p={3}>
          <DatePicker date={date} clearDate={handleClearDate} onChange={handleChangeDate} />
          {currencys.map((item) => (
            <CurrencyRow key={item.id}>
              <span className={classes.abbreviation}>
                {item.scale} {item.name}:
              </span>
              <span className={classes.value}>{item.exchange.toFixed(4)}</span>
            </CurrencyRow>
          ))}
        </Box>
        <Box hidden={currentTab !== 1} p={3}>
          <CurrencyRow>
            <ChooseCurrencySelection
              api={api}
              favorites={favorites}
              choosedCurrency={choosedCurrency}
              handleChooseCurrency={handleChangeCurrency}
            />
            <TextField
              className={classes.textFieldStyled}
              fullWidth
              type="number"
              value={number ?? 0}
              onChange={hanldeChangeNumber}
            />
          </CurrencyRow>
          {rates.map((item) => (
            <CurrencyRow key={item.id}>
              <CurrencyName currency={item} naming={naming} />
              <CurrencyValue currency={item} number={number} />
            </CurrencyRow>
          ))}
        </Box>
        <Box hidden={currentTab !== 2} p={3}>
          {cryproRates.map((item) => (
            <CurrencyRow key={item.id}>
              <span className={classes.abbreviation}>
                {item.rank}. {item.name}:
              </span>
              <span className={classes.value}>{formatMoneySpaces(Number(item.priceUsd).toFixed(5))}$</span>
            </CurrencyRow>
          ))}
        </Box>
      </main>
      <footer className={classes.footer}>
        <FormControlLabel
          control={<Switch checked={isPageTooltip} onChange={saveOptions} />}
          color="primary"
          label="Работать на странице"
        />
        <OptionsButton />
      </footer>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 400,
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
        textAlign: 'center',
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
    footer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid grey',
    },
  }),
);
