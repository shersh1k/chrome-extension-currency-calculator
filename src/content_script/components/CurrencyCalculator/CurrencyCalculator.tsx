import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import { CurrencyName, CurrencyRow, CurrencyValue } from 'atoms';
import { ChooseCurrencySelection, DatePicker } from 'molecules';
import { IExchangeRate } from 'types';
import { setOptionsToStorage } from 'storage';
import { getCalculatedRates } from 'helpers';
import { optionsActions, optionsSelectors } from 'commonCore';
import { appActions, appSelectors } from 'contentScriptCore';

import { popoverContainer } from '../../reactContainer';

export const CurrencyCalculator: React.FC = () => {
  const { root, loader, exchangeResults, textFieldStyled } = useStyles();
  const dispatch = useDispatch();

  const api = useSelector(optionsSelectors.getApi);
  const naming = useSelector(optionsSelectors.getNaming);
  const favorites = useSelector(optionsSelectors.getFavorites);
  const currency = useSelector(optionsSelectors.getLatestCurrency);
  const number = useSelector(appSelectors.getNumber);
  const date = useSelector(appSelectors.getDate);
  const exchangeRates = useSelector(appSelectors.getExchangeRates);
  const loading = useSelector(appSelectors.getLoading);
  const error = useSelector(appSelectors.getError);

  const [rates, setRates] = useState<IExchangeRate[]>([]);

  const hanldeChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(appActions.setNumber({ number: event.target.value }));
  };

  const handleChangeDate = (newDate: Date | null) => {
    dispatch(appActions.setDate({ date: newDate }));
  };

  const handleChangeCurrency = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const newCurrency = (event.target as HTMLInputElement).value;
    setOptionsToStorage({ latestCurrency: newCurrency });
    dispatch(optionsActions.setLatestCurrency({ latestCurrency: newCurrency }));
  };

  const handleClearDate = () => dispatch(appActions.setDate({ date: new Date() }));

  useEffect(() => {
    dispatch(appActions.getExchangeRatesRequest());
  }, [dispatch, date, api]);

  useEffect(() => {
    const newRates = getCalculatedRates(exchangeRates, api, favorites, currency);
    setRates(newRates ?? []);
  }, [exchangeRates, currency, api, favorites]);

  if (number === null || currency === null || api === null || naming === null) return null;

  return (
    <div className={root}>
      <DatePicker clearDate={handleClearDate} container={popoverContainer} date={date} onChange={handleChangeDate} />
      <CurrencyRow>
        <ChooseCurrencySelection
          api={api}
          choosedCurrency={currency}
          container={popoverContainer}
          favorites={favorites}
          handleChooseCurrency={handleChangeCurrency}
        />
        <TextField className={textFieldStyled} type="number" value={number ?? 0} onChange={hanldeChangeNumber} />
      </CurrencyRow>
      <div className={exchangeResults}>
        {rates.map((item) => (
          <CurrencyRow key={item.id}>
            <CurrencyName disablePortal currency={item} naming={naming} />
            <CurrencyValue currency={item} number={number} />
          </CurrencyRow>
        ))}
      </div>
      {loading && (
        <div className={loader}>
          <CircularProgress />
        </div>
      )}
      {error && (
        <Tooltip
          PopperProps={{ disablePortal: true }}
          placement="left"
          title={
            <Typography>
              Попробуйте выбрать другую дату, <br />
              или повторить запрос позже <br />
              <br />
              При наличии будут показаны <br />
              кэшированные результаты <br />
            </Typography>
          }
        >
          <Typography color="error">
            Ошибка получения курсов валют. <br />
          </Typography>
        </Tooltip>
      )}
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    loader: {
      minHeight: 90,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    root: {
      minWidth: 190,
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
    },
    textFieldStyled: {
      '& input': {
        textAlign: 'right',
        fontWeight: 700,
        width: 'auto',
      },
    },
    exchangeResults: {
      paddingTop: 10,
    },
  }),
);
