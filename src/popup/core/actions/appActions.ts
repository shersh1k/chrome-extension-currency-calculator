import { IExchangeRate, IExchangeRateCrypto } from 'types';
import { createAction } from 'typesafe-actions';

import { ACTIONS } from './constants';

export const setTab = createAction(ACTIONS.SET_TAB_TO_STORE)<{ tab: number }>();

export const setNumber = createAction(ACTIONS.SET_NUMBER_TO_STORE)<{ number: number | string | null }>();
export const setCurrency = createAction(ACTIONS.SET_CURRENCY_TO_STORE)<{ currency: string | null }>();
export const setDate = createAction(ACTIONS.SET_DATE_TO_STORE)<{ date: Date | null }>();

export const getExchangeRatesRequest = createAction(ACTIONS.GET_EXCHANGE_RATES_REQUEST)();
export const getExchangeRatesSuccess = createAction(ACTIONS.GET_EXCHANGE_RATES_SUCCESS)();
export const getExchangeRatesFailure = createAction(ACTIONS.GET_EXCHANGE_RATES_FAILURE)();
export const putExchangeRatesToStore = createAction(ACTIONS.PUT_EXCHANGE_RATES_TO_STORE)<{
  exchangeRates: IExchangeRate[];
}>();

export const getExchangeRatesCryptoRequest = createAction(ACTIONS.GET_EXCHANGE_RATES_CRYPTO_REQUEST)();
export const getExchangeRatesCryptoSuccess = createAction(ACTIONS.GET_EXCHANGE_RATES_CRYPTO_SUCCESS)();
export const getExchangeRatesCryptoFailure = createAction(ACTIONS.GET_EXCHANGE_RATES_CRYPTO_FAILURE)();
export const putExchangeRatesCryptoToStore = createAction(ACTIONS.PUT_EXCHANGE_RATES_CRYPTO_TO_STORE)<{
  exchangeRatesCrypto: IExchangeRateCrypto[];
}>();
