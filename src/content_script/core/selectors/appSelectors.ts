import { IState } from '../types';

export const getAppState = ({ app }: IState) => app;
export type AppStateType = ReturnType<typeof getAppState>;

export const getIsPinned = ({ app: { isPinned } }: IState) => isPinned;
export const getIsShowed = ({ app: { isShowed } }: IState) => isShowed;
export const getPosition = ({ app: { position } }: IState) => position;

export const getNumber = ({ app: { number } }: IState) => number;
export const getDate = ({ app: { date } }: IState) => date;
export type DateType = ReturnType<typeof getDate>;

export const getExchangeRates = ({ app: { exchangeRates } }: IState) => exchangeRates;
export const getLoading = ({ app: { loading } }: IState) => loading;
export const getError = ({ app: { error } }: IState) => error;
