import { IExchangeRate } from 'types';
import { ActionType, createReducer } from 'typesafe-actions';

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

export const appReducer = createReducer<IAppState, ActionType<typeof appActions>>(defaultState)
  .handleAction(appActions.setTab, (state, { payload: { tab } }) => ({
    ...state,
    tab,
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
  }));
