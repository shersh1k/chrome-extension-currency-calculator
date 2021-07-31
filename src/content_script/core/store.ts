import { applyMiddleware, createStore, Store } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './rootReducer';
import { IState } from './types';

export const store: Store<IState> = createStore(rootReducer, applyMiddleware(logger));

export const initialRootState = {
  ...store.getState(),
};
