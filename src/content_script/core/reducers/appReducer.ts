import { IExchangeRate, IPosition } from 'types';
import { ActionType, createReducer } from 'typesafe-actions';

import { appActions } from '../actions';

export interface IAppState {
  isShowed: boolean;
  isPinned: boolean;
  position: IPosition;

  exchangeRates: IExchangeRate[];
  loading: boolean;
  error: boolean;

  number: number | null | string;
  date: Date;
}

const defaultState: IAppState = {
  isShowed: false,
  isPinned: false,
  position: { x: 0, y: 0 },

  exchangeRates: [],
  loading: false,
  error: false,

  number: null,
  date: new Date(),
};

export const appReducer = createReducer<IAppState, ActionType<typeof appActions>>(defaultState)
  .handleAction(appActions.setIsShowed, (state, { payload: { isShowed } }) => ({
    ...state,
    isShowed,
  }))
  .handleAction(appActions.setIsPinned, (state, { payload: { isPinned } }) => ({
    ...state,
    isPinned,
  }))
  .handleAction(appActions.setPosition, (state, { payload: { position } }) => ({
    ...state,
    position,
  }))

  .handleAction(appActions.setNumber, (state, { payload: { number } }) => ({
    ...state,
    number,
  }))
  .handleAction(appActions.setDate, (state, { payload: { date } }) => ({
    ...state,
    ...(date && { date }),
  }))

  .handleAction(appActions.getExchangeRatesRequest, (state) => ({
    ...state,
    exchangeRates: [],
    loading: true,
    error: false,
  }))
  .handleAction(appActions.getExchangeRatesSuccess, (state) => ({
    ...state,
    loading: false,
  }))
  .handleAction(appActions.getExchangeRatesFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
  .handleAction(appActions.putExchangeRatesToStore, (state, { payload: { exchangeRates } }) => ({
    ...state,
    exchangeRates,
  }))

  .handleAction(appActions.open, (state, { payload: { position, number } }) => ({
    ...state,
    position,
    number,
    isShowed: true,
  }))
  .handleAction(appActions.close, (state) => ({
    ...state,
    isShowed: false,
    isPinned: false,
    position: { x: 0, y: 0 },

    loading: false,
    error: false,

    number: null,
    date: new Date(),
  }));
