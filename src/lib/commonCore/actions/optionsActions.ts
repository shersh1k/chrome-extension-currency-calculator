import { ApiTypes, NamingTypes } from 'types';
import { createAction } from 'typesafe-actions';
import { ACTIONS } from './constants';

export const setOptions = createAction(ACTIONS.SET_OPTIONS_TO_STORE)<{
  api?: ApiTypes | null;
  isPageTooltip?: boolean | null;
  naming?: NamingTypes | null;
  favorites?: string[] | null;
}>();

export const setIsPageTooltip = createAction(ACTIONS.SET_IS_PAGE_TOOLTIP_TO_STORE)<{ isPageTooltip: boolean }>();
export const setApi = createAction(ACTIONS.SET_API_TO_STORE)<{ api: ApiTypes }>();
export const setNaming = createAction(ACTIONS.SET_NAMING_TO_STORE)<{ naming: NamingTypes }>();
export const setFavorites = createAction(ACTIONS.SET_FAVORITES_TO_STORE)<{ favorites: string[] }>();
