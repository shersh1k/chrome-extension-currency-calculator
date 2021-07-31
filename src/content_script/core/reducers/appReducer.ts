import { IPosition } from 'types';
import { ActionType, createReducer } from 'typesafe-actions';

import { appActions } from '../actions';

export interface IAppState {
  isShowed: boolean;
  isPinned: boolean;
  position: IPosition;

  number: number | null | string;
  currency: string | null;
  date: Date;
}

const defaultState: IAppState = {
  isShowed: false,
  isPinned: false,
  position: { x: 0, y: 0 },

  number: null,
  currency: null,
  date: new Date(),
};

export const appReducer = createReducer<IAppState, ActionType<typeof appActions>>(defaultState)
  .handleAction(appActions.setIsShowed, (state, { payload: { isShowed } }) => ({
    ...state,
    isShowed,
  }))
  .handleAction(appActions.setIsPinned, (state, { payload: { isPinned } }) => ({
    ...state,
    isPinned,
  }))
  .handleAction(appActions.setPosition, (state, { payload: { position } }) => ({
    ...state,
    position,
  }))

  .handleAction(appActions.setNumber, (state, { payload: { number } }) => ({
    ...state,
    number,
  }))
  .handleAction(appActions.setCurrency, (state, { payload: { currency } }) => ({
    ...state,
    currency,
  }))
  .handleAction(appActions.setDate, (state, { payload: { date } }) => ({
    ...state,
    ...(date && { date }),
  }))

  .handleAction(appActions.open, (state, { payload: { position, number } }) => ({
    ...state,
    position,
    number,
    isShowed: true,
  }))
  .handleAction(appActions.close, (state) => ({
    ...defaultState,
  }));
