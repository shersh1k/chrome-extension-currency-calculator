import { IState } from '../types';

export const getAppState = ({ app }: IState) => app;

export const getTab = ({ app: { tab } }: IState) => tab;

export const getNumber = ({ app: { number } }: IState) => number;
export const getDate = ({ app: { date } }: IState) => date;
export type DateType = ReturnType<typeof getDate>;

export const getExchangeRates = ({ app: { exchangeRates } }: IState) => exchangeRates;
export const getLoading = ({ app: { loading } }: IState) => loading;
export const getError = ({ app: { error } }: IState) => error;

export const getExchangeRatesCrypto = ({ app: { exchangeRatesCrypto } }: IState) => exchangeRatesCrypto;
