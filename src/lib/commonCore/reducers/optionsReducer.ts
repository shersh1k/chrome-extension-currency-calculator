import { ApiTypes, NamingTypes } from 'types';
import { ActionType, createReducer } from 'typesafe-actions';
import { API } from 'consts';

import { optionsActions } from '../actions';

export interface IOptionsState {
  isPageTooltip: boolean | null;
  api: ApiTypes | null;
  favorites: string[];
  naming: NamingTypes | null;
  latestCurrency: string;
}

const defaultState: IOptionsState = {
  isPageTooltip: null,
  api: null,
  favorites: [],
  naming: null,
  latestCurrency: API,
};

export const optionsReducer = createReducer<IOptionsState, ActionType<typeof optionsActions>>(defaultState)
  .handleAction(
    optionsActions.setOptions,
    (state, { payload: { isPageTooltip, api, favorites, naming, latestCurrency } }) => {
      return {
        ...state,
        ...(typeof isPageTooltip === 'boolean' && { isPageTooltip }),
        ...(api && { api }),
        ...(favorites && { favorites }),
        ...(naming && { naming }),
        ...(latestCurrency && { latestCurrency }),
      };
    },
  )
  .handleAction(optionsActions.setIsPageTooltip, (state, { payload: { isPageTooltip } }) => ({
    ...state,
    isPageTooltip,
  }))
  .handleAction(optionsActions.setApi, (state, { payload: { api } }) => ({
    ...state,
    api,
  }))
  .handleAction(optionsActions.setFavorites, (state, { payload: { favorites } }) => ({
    ...state,
    favorites,
  }))
  .handleAction(optionsActions.setNaming, (state, { payload: { naming } }) => ({
    ...state,
    naming,
  }))
  .handleAction(optionsActions.setLatestCurrency, (state, { payload: { latestCurrency } }) => ({
    ...state,
    latestCurrency,
  }));
