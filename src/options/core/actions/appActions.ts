import { IExchangeRate } from 'types';
import { createAction } from 'typesafe-actions';

import { ACTIONS } from './constants';

export const setTab = createAction(ACTIONS.SET_TAB_TO_STORE)<{ tab: number }>();

export const getExchangeRatesRequest = createAction(ACTIONS.GET_EXCHANGE_RATES_REQUEST)();
export const getExchangeRatesSuccess = createAction(ACTIONS.GET_EXCHANGE_RATES_SUCCESS)();
export const getExchangeRatesFailure = createAction(ACTIONS.GET_EXCHANGE_RATES_FAILURE)();
export const putExchangeRatesToStore = createAction(ACTIONS.PUT_EXCHANGE_RATES_TO_STORE)<{
  exchangeRates: IExchangeRate[];
}>();
