import { IState } from '../types';

export const getAppState = ({ app }: IState) => app;
export type AppStateType = ReturnType<typeof getAppState>;

export const getTab = ({ app: { tab } }: IState) => tab;

export const getExchangeRates = ({ app: { exchangeRates } }: IState) => exchangeRates;
export const getLoading = ({ app: { loading } }: IState) => loading;
export const getError = ({ app: { error } }: IState) => error;
