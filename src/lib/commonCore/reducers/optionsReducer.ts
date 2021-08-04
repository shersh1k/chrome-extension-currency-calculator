import { ApiTypes, NamingTypes } from 'types';
import { ActionType, createReducer } from 'typesafe-actions';

import { optionsActions } from '../actions';

export interface IOptionsState {
  isPageTooltip: boolean | null;
  api: ApiTypes | null;
  favorites: string[];
  naming: NamingTypes | null;
}

const defaultState: IOptionsState = {
  isPageTooltip: null,
  api: null,
  favorites: [],
  naming: null,
};

export const optionsReducer = createReducer<IOptionsState, ActionType<typeof optionsActions>>(defaultState)
  .handleAction(optionsActions.setOptions, (state, { payload: { isPageTooltip, api, favorites, naming } }) => {
    return {
      ...state,
      ...(typeof isPageTooltip === 'boolean' && { isPageTooltip }),
      ...(api && { api }),
      ...(favorites && { favorites }),
      ...(naming && { naming }),
    };
  })
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
  }));
