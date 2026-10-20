import { createReducer } from '@reduxjs/toolkit';
import { ApiTypes, NamingTypes } from 'types';
import { API, IS_HONEST_PRICE, SALARY } from 'consts';

import { optionsActions } from '../actions';

export interface IOptionsState {
  isPageTooltip: boolean | null;
  api: ApiTypes | null;
  favorites: string[];
  naming: NamingTypes | null;
  latestCurrency: string;
  isHonestPrice: boolean;
  salary: number;
  salaryCurrency: string | null;
}

const defaultState: IOptionsState = {
  isPageTooltip: null,
  api: null,
  favorites: [],
  naming: null,
  latestCurrency: API,
  isHonestPrice: IS_HONEST_PRICE,
  salary: SALARY,
  salaryCurrency: null,
};

export const optionsReducer = createReducer(defaultState, (builder) =>
  builder
    .addCase(
      optionsActions.setOptions,
      (
        state,
        { payload: { isPageTooltip, api, favorites, naming, latestCurrency, isHonestPrice, salary, salaryCurrency } },
      ) => {
        return {
          ...state,
          ...(typeof isPageTooltip === 'boolean' && { isPageTooltip }),
          ...(api && { api }),
          ...(favorites && { favorites }),
          ...(naming && { naming }),
          ...(latestCurrency && { latestCurrency }),
          ...(typeof isHonestPrice === 'boolean' && { isHonestPrice }),
          ...(typeof salary === 'number' && { salary }),
          ...(salaryCurrency !== undefined && { salaryCurrency }),
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
    .addCase(optionsActions.setIsHonestPrice, (state, { payload: { isHonestPrice } }) => ({
      ...state,
      isHonestPrice,
    }))
    .addCase(optionsActions.setSalary, (state, { payload: { salary } }) => ({
      ...state,
      salary,
    }))
    .addCase(optionsActions.setSalaryCurrency, (state, { payload: { salaryCurrency } }) => ({
      ...state,
      salaryCurrency,
    }))
    .addCase(optionsActions.setLatestCurrency, (state, { payload: { latestCurrency } }) => ({
      ...state,
      latestCurrency,
    })),
);
