import { createReducer } from '@reduxjs/toolkit';
import { ApiTypes, NamingTypes } from 'types';
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

export const optionsReducer = createReducer(defaultState, (builder) =>
  builder
    .addCase(
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
    .addCase(optionsActions.setIsPageTooltip, (state, { payload: { isPageTooltip } }) => ({
      ...state,
      isPageTooltip,
    }))
    .addCase(optionsActions.setApi, (state, { payload: { api } }) => ({
      ...state,
      api,
    }))
    .addCase(optionsActions.setFavorites, (state, { payload: { favorites } }) => ({
      ...state,
      favorites,
    }))
    .addCase(optionsActions.setNaming, (state, { payload: { naming } }) => ({
      ...state,
      naming,
    }))
    .addCase(optionsActions.setLatestCurrency, (state, { payload: { latestCurrency } }) => ({
      ...state,
      latestCurrency,
    })),
);
