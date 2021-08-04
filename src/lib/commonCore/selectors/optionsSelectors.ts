import { IOptionsState } from '../reducers';

export const getOptionsState = ({ options }: { options: IOptionsState }) => options;

export const getIsPageTooltip = ({ options: { isPageTooltip } }: { options: IOptionsState }) => isPageTooltip;
export const getApi = ({ options: { api } }: { options: IOptionsState }) => api;
export const getFavorites = ({ options: { favorites } }: { options: IOptionsState }) => favorites;
export const getNaming = ({ options: { naming } }: { options: IOptionsState }) => naming;
