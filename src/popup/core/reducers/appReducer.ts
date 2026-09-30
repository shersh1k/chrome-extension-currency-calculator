import { createReducer } from '@reduxjs/toolkit';
import { IExchangeRate, IExchangeRateCrypto } from 'types';

import { appActions } from '../actions';

export interface IAppState {
  tab: number;

  exchangeRatesCrypto: IExchangeRateCrypto[];
  exchangeRates: IExchangeRate[];
  loading: boolean;
  error: boolean;

  number: number | null | string;
  date: Date;
}

const defaultState: IAppState = {
  tab: 0,

  exchangeRates: [],
  exchangeRatesCrypto: [],
  loading: false,
  error: false,

  number: null,
  date: new Date(),
};

export const appReducer = createReducer(defaultState, (builder) =>
  builder
    .addCase(appActions.setTab, (state, { payload: { tab } }) => ({
      ...state,
      tab,
    }))

    .addCase(appActions.setNumber, (state, { payload: { number } }) => ({
      ...state,
      number,
    }))
    .addCase(appActions.setDate, (state, { payload: { date } }) => ({
      ...state,
      ...(date && { date }),
    }))

    .addCase(appActions.getExchangeRatesRequest, (state) => ({
      ...state,
      exchangeRates: [],
      loading: true,
      error: false,
    }))
    .addCase(appActions.getExchangeRatesSuccess, (state) => ({
      ...state,
      loading: false,
    }))
    .addCase(appActions.getExchangeRatesFailure, (state) => ({
      ...state,
      loading: false,
      error: true,
    }))
    .addCase(appActions.putExchangeRatesToStore, (state, { payload: { exchangeRates } }) => ({
      ...state,
      exchangeRates,
    }))

    .addCase(appActions.getExchangeRatesCryptoRequest, (state) => ({
      ...state,
      exchangeRatesCrypto: [],
      loading: true,
      error: false,
    }))
    .addCase(appActions.getExchangeRatesCryptoSuccess, (state) => ({
      ...state,
      loading: false,
    }))
    .addCase(appActions.getExchangeRatesCryptoFailure, (state) => ({
      ...state,
      loading: false,
      error: true,
    }))
    .addCase(appActions.putExchangeRatesCryptoToStore, (state, { payload: { exchangeRatesCrypto } }) => ({
      ...state,
      exchangeRatesCrypto,
    })),
);
