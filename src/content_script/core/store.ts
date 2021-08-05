import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { IState } from './types';

const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

export const store: Store<IState> = createStore(rootReducer, applyMiddleware(...middlewares));

export const initialRootState = {
  ...store.getState(),
};

sagaMiddleware.run(rootSaga);
