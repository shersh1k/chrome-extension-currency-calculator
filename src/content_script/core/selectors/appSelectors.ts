import { IState } from '../types';

export const getAppState = ({ app }: IState) => app;

export const getIsPinned = ({ app: { isPinned } }: IState) => isPinned;
export const getIsShowed = ({ app: { isShowed } }: IState) => isShowed;
export const getPosition = ({ app: { position } }: IState) => position;

export const getCurrency = ({ app: { currency } }: IState) => currency;
export const getNumber = ({ app: { number } }: IState) => number;
export const getDate = ({ app: { date } }: IState) => date;
