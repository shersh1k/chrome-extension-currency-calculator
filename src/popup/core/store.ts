import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { configureStore, Middleware } from '@reduxjs/toolkit';

import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

const isDevelopment = process.env.NODE_ENV === 'development';

const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware];

if (isDevelopment) {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: rootReducer,
  // side effects live in sagas, and state keeps Date objects
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(middlewares),
  devTools: isDevelopment,
});

export const initialRootState = {
  ...store.getState(),
};

sagaMiddleware.run(rootSaga);
