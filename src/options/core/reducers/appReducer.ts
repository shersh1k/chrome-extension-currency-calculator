import { createReducer } from '@reduxjs/toolkit';
import { IExchangeRate } from 'types';

import { appActions } from '../actions';

export interface IAppState {
  tab: number;

  exchangeRates: IExchangeRate[];
  loading: boolean;
  error: boolean;
}

const defaultState: IAppState = {
  tab: 0,

  exchangeRates: [],
  loading: false,
  error: false,
};

export const appReducer = createReducer(defaultState, (builder) =>
  builder
    .addCase(appActions.setTab, (state, { payload: { tab } }) => ({
      ...state,
      tab,
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
    })),
);
