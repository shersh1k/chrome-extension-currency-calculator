import { createAction } from '@reduxjs/toolkit';
import { IExchangeRate } from 'types';

import { ACTIONS } from './constants';

export const setTab = createAction<{ tab: number }>(ACTIONS.SET_TAB_TO_STORE);

export const getExchangeRatesRequest = createAction(ACTIONS.GET_EXCHANGE_RATES_REQUEST);
export const getExchangeRatesSuccess = createAction(ACTIONS.GET_EXCHANGE_RATES_SUCCESS);
export const getExchangeRatesFailure = createAction(ACTIONS.GET_EXCHANGE_RATES_FAILURE);
export const putExchangeRatesToStore = createAction<{
  exchangeRates: IExchangeRate[];
}>(ACTIONS.PUT_EXCHANGE_RATES_TO_STORE);
