import { combineReducers } from '@reduxjs/toolkit';
import { optionsReducer } from 'commonCore';

import { appReducer } from './reducers';

export const rootReducer = combineReducers({
  app: appReducer,
  options: optionsReducer,
});
