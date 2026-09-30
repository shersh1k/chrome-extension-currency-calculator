import { createAction } from '@reduxjs/toolkit';
import { IExchangeRate, IPosition } from 'types';

import { ACTIONS } from './constants';

export const setIsShowed = createAction<{ isShowed: boolean }>(ACTIONS.SET_IS_SHOWED_TO_STORE);
export const setIsPinned = createAction<{ isPinned: boolean }>(ACTIONS.SET_IS_PINNED_TO_STORE);
export const setPosition = createAction<{ position: IPosition }>(ACTIONS.SET_POSITION_TO_STORE);

export const setNumber = createAction<{ number: number | string | null }>(ACTIONS.SET_NUMBER_TO_STORE);
export const setDate = createAction<{ date: Date | null }>(ACTIONS.SET_DATE_TO_STORE);

export const open = createAction<{ position: IPosition; number: number }>(ACTIONS.OPEN);
export const close = createAction(ACTIONS.CLOSE);

export const getExchangeRatesRequest = createAction(ACTIONS.GET_EXCHANGE_RATES_REQUEST);
export const getExchangeRatesSuccess = createAction(ACTIONS.GET_EXCHANGE_RATES_SUCCESS);
export const getExchangeRatesFailure = createAction(ACTIONS.GET_EXCHANGE_RATES_FAILURE);
export const putExchangeRatesToStore = createAction<{
  exchangeRates: IExchangeRate[];
}>(ACTIONS.PUT_EXCHANGE_RATES_TO_STORE);
