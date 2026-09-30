import { createAction } from '@reduxjs/toolkit';
import { IExchangeRate, IExchangeRateCrypto } from 'types';

import { ACTIONS } from './constants';

export const setTab = createAction<{ tab: number }>(ACTIONS.SET_TAB_TO_STORE);

export const setNumber = createAction<{ number: number | string | null }>(ACTIONS.SET_NUMBER_TO_STORE);
export const setDate = createAction<{ date: Date | null }>(ACTIONS.SET_DATE_TO_STORE);

export const getExchangeRatesRequest = createAction(ACTIONS.GET_EXCHANGE_RATES_REQUEST);
export const getExchangeRatesSuccess = createAction(ACTIONS.GET_EXCHANGE_RATES_SUCCESS);
export const getExchangeRatesFailure = createAction(ACTIONS.GET_EXCHANGE_RATES_FAILURE);
export const putExchangeRatesToStore = createAction<{
  exchangeRates: IExchangeRate[];
}>(ACTIONS.PUT_EXCHANGE_RATES_TO_STORE);

export const getExchangeRatesCryptoRequest = createAction(ACTIONS.GET_EXCHANGE_RATES_CRYPTO_REQUEST);
export const getExchangeRatesCryptoSuccess = createAction(ACTIONS.GET_EXCHANGE_RATES_CRYPTO_SUCCESS);
export const getExchangeRatesCryptoFailure = createAction(ACTIONS.GET_EXCHANGE_RATES_CRYPTO_FAILURE);
export const putExchangeRatesCryptoToStore = createAction<{
  exchangeRatesCrypto: IExchangeRateCrypto[];
}>(ACTIONS.PUT_EXCHANGE_RATES_CRYPTO_TO_STORE);
