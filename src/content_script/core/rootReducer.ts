import { combineReducers } from 'redux';

import { appReducer, optionsReducer } from './reducers';

export const rootReducer = combineReducers({
  app: appReducer,
  options: optionsReducer,
});
