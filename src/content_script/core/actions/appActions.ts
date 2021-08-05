import { IExchangeRate, IPosition } from 'types';
import { createAction } from 'typesafe-actions';

import { ACTIONS } from './constants';

export const setIsShowed = createAction(ACTIONS.SET_IS_SHOWED_TO_STORE)<{ isShowed: boolean }>();
export const setIsPinned = createAction(ACTIONS.SET_IS_PINNED_TO_STORE)<{ isPinned: boolean }>();
export const setPosition = createAction(ACTIONS.SET_POSITION_TO_STORE)<{ position: IPosition }>();

export const setNumber = createAction(ACTIONS.SET_NUMBER_TO_STORE)<{ number: number | string | null }>();
export const setDate = createAction(ACTIONS.SET_DATE_TO_STORE)<{ date: Date | null }>();

export const open = createAction(ACTIONS.OPEN)<{ position: IPosition; number: number }>();
export const close = createAction(ACTIONS.CLOSE)();

export const getExchangeRatesRequest = createAction(ACTIONS.GET_EXCHANGE_RATES_REQUEST)();
export const getExchangeRatesSuccess = createAction(ACTIONS.GET_EXCHANGE_RATES_SUCCESS)();
export const getExchangeRatesFailure = createAction(ACTIONS.GET_EXCHANGE_RATES_FAILURE)();
export const putExchangeRatesToStore = createAction(ACTIONS.PUT_EXCHANGE_RATES_TO_STORE)<{
  exchangeRates: IExchangeRate[];
}>();
