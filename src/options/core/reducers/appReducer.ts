import { IExchangeRate, IExchangeRateCrypto } from 'types';
import { ActionType, createReducer } from 'typesafe-actions';

import { appActions } from '../actions';

export interface IAppState {
  tab: number;

  exchangeRatesCrypto: IExchangeRateCrypto[];
  exchangeRates: IExchangeRate[];
  loading: boolean;
  error: boolean;

  number: number | null | string;
  currency: string | null;
  date: Date;
}

const defaultState: IAppState = {
  tab: 0,

  exchangeRates: [],
  exchangeRatesCrypto: [],
  loading: false,
  error: false,

  number: null,
  currency: null,
  date: new Date(),
};

export const appReducer = createReducer<IAppState, ActionType<typeof appActions>>(defaultState)
  .handleAction(appActions.setTab, (state, { payload: { tab } }) => ({
    ...state,
    tab,
  }))

  .handleAction(appActions.setNumber, (state, { payload: { number } }) => ({
    ...state,
    number,
  }))
  .handleAction(appActions.setCurrency, (state, { payload: { currency } }) => ({
    ...state,
    currency,
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

  .handleAction(appActions.getExchangeRatesCryptoRequest, (state) => ({
    ...state,
    exchangeRatesCrypto: [],
    loading: true,
    error: false,
  }))
  .handleAction(appActions.getExchangeRatesCryptoSuccess, (state) => ({
    ...state,
    loading: false,
  }))
  .handleAction(appActions.getExchangeRatesCryptoFailure, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
  .handleAction(appActions.putExchangeRatesCryptoToStore, (state, { payload: { exchangeRatesCrypto } }) => ({
    ...state,
    exchangeRatesCrypto,
  }));
