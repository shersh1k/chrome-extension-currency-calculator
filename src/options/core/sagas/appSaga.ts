import { SagaIterator } from 'redux-saga';
import { call, put, SagaReturnType, select, takeLatest } from 'redux-saga/effects';

import { Api } from 'API';
import { optionsSelectors } from 'commonCore';

import { appActions } from '../actions';

type ExchangeRates = SagaReturnType<typeof Api.getExchangeRates>;
function* getExchangeRates(): SagaIterator {
  try {
    const api = yield select(optionsSelectors.getApi);

    const exchangeRates: ExchangeRates = yield call(() => Api.getExchangeRates(api));

    yield put(appActions.getExchangeRatesSuccess());
    yield put(appActions.putExchangeRatesToStore({ exchangeRates }));
  } catch {
    yield put(appActions.getExchangeRatesFailure());
  }
}

export function* appSaga(): SagaIterator {
  yield takeLatest(appActions.getExchangeRatesRequest.type, getExchangeRates);
}
