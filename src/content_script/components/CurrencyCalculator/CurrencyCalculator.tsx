import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { CurrencyName, CurrencyRow, CurrencyValue } from 'atoms';
import { ChooseCurrencySelection, DatePicker, HonestPrice } from 'molecules';
import { IExchangeRate } from 'types';
import { setOptionsToStorage } from 'storage';
import { getCalculatedRates } from 'helpers';
import { optionsActions, optionsSelectors } from 'commonCore';
import { appActions, appSelectors } from 'contentScriptCore';

import { popoverContainer } from '../../reactContainer';

export const CurrencyCalculator: React.FC = () => {
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
    <Box sx={{ minWidth: 190, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <DatePicker clearDate={handleClearDate} container={popoverContainer} date={date} onChange={handleChangeDate} />
      <CurrencyRow>
        <ChooseCurrencySelection
          api={api}
          choosedCurrency={currency}
          container={popoverContainer}
          favorites={favorites}
          handleChooseCurrency={handleChangeCurrency}
        />
        {/* value={new Intl.NumberFormat('ru-RU').format(Number(number) ?? 0)} */}
        <TextField
          sx={{ '& input': { textAlign: 'right', fontWeight: 700, width: 'auto' } }}
          type="number"
          value={number ?? 0}
          variant="standard"
          onChange={hanldeChangeNumber}
        />
      </CurrencyRow>
      <Box sx={{ paddingTop: '10px' }}>
        {rates.map((item) => (
          <CurrencyRow key={item.id}>
            <CurrencyName disablePortal currency={item} naming={naming} onClick={handleClickCurrency} />
            <CurrencyValue currency={item} number={number} />
          </CurrencyRow>
        ))}
        <HonestPrice disablePortal api={api} currency={currency} exchangeRates={exchangeRates} number={number} />
      </Box>
      {loading && (
        <Box sx={{ minHeight: 90, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Tooltip
          placement="left"
          slotProps={{ popper: { disablePortal: true } }}
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
    </Box>
  );
};
