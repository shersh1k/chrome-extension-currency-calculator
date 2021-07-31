import { IState } from '../types';

export const getOptionsState = ({ options }: IState) => options;

export const getIsPageTooltip = ({ options: { isPageTooltip } }: IState) => isPageTooltip;
export const getApi = ({ options: { api } }: IState) => api;
export const getFavorites = ({ options: { favorites } }: IState) => favorites;
export const getNaming = ({ options: { naming } }: IState) => naming;
