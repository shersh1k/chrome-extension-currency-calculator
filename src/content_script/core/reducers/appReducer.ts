import { createReducer } from '@reduxjs/toolkit';
import { IExchangeRate, IPosition } from 'types';

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

export const appReducer = createReducer(defaultState, (builder) =>
  builder
    .addCase(appActions.setIsShowed, (state, { payload: { isShowed } }) => ({
      ...state,
      isShowed,
    }))
    .addCase(appActions.setIsPinned, (state, { payload: { isPinned } }) => ({
      ...state,
      isPinned,
    }))
    .addCase(appActions.setPosition, (state, { payload: { position } }) => ({
      ...state,
      position,
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

    .addCase(appActions.open, (state, { payload: { position, number } }) => ({
      ...state,
      position,
      number,
      isShowed: true,
    }))
    .addCase(appActions.close, (state) => ({
      ...state,
      isShowed: false,
      isPinned: false,
      position: { x: 0, y: 0 },

      loading: false,
      error: false,

      number: null,
      date: new Date(),
    })),
);
