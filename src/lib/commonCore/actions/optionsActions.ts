import { createAction } from '@reduxjs/toolkit';
import { ApiTypes, NamingTypes } from 'types';
import { ACTIONS } from './constants';

export const setOptions = createAction<{
  api?: ApiTypes | null;
  isPageTooltip?: boolean | null;
  naming?: NamingTypes | null;
  favorites?: string[] | null;
  latestCurrency?: string | null;
  isHonestPrice?: boolean | null;
  salary?: number | null;
  salaryCurrency?: string | null;
}>(ACTIONS.SET_OPTIONS_TO_STORE);

export const setIsPageTooltip = createAction<{ isPageTooltip: boolean }>(ACTIONS.SET_IS_PAGE_TOOLTIP_TO_STORE);
export const setApi = createAction<{ api: ApiTypes }>(ACTIONS.SET_API_TO_STORE);
export const setNaming = createAction<{ naming: NamingTypes }>(ACTIONS.SET_NAMING_TO_STORE);
export const setFavorites = createAction<{ favorites: string[] }>(ACTIONS.SET_FAVORITES_TO_STORE);
export const setIsHonestPrice = createAction<{ isHonestPrice: boolean }>(ACTIONS.SET_IS_HONEST_PRICE_TO_STORE);
export const setSalary = createAction<{ salary: number }>(ACTIONS.SET_SALARY_TO_STORE);
export const setSalaryCurrency = createAction<{ salaryCurrency: string | null }>(ACTIONS.SET_SALARY_CURRENCY_TO_STORE);

export const setLatestCurrency = createAction<{ latestCurrency: string }>(ACTIONS.SET_LATEST_CURRENCY_TO_STORE);
