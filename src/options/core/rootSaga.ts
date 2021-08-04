import { all } from 'redux-saga/effects';

import { appSaga } from './sagas';

export function* rootSaga() {
  try {
    yield all([appSaga()]);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
