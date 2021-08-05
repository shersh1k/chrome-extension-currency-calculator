import { IOptionsState } from '../reducers';

export const getOptionsState = ({ options }: { options: IOptionsState }) => options;
export type OptionsType = ReturnType<typeof getOptionsState>;

export const getIsPageTooltip = ({ options: { isPageTooltip } }: { options: IOptionsState }) => isPageTooltip;
export type IsPageTooltipType = ReturnType<typeof getIsPageTooltip>;
export const getApi = ({ options: { api } }: { options: IOptionsState }) => api;
export type ApiType = ReturnType<typeof getApi>;
export const getFavorites = ({ options: { favorites } }: { options: IOptionsState }) => favorites;
export type FavoritesType = ReturnType<typeof getFavorites>;
export const getNaming = ({ options: { naming } }: { options: IOptionsState }) => naming;
export type NamingType = ReturnType<typeof getNaming>;
export const getLatestCurrency = ({ options: { latestCurrency } }: { options: IOptionsState }) => latestCurrency;
export type LatestCurrencyType = ReturnType<typeof getLatestCurrency>;
