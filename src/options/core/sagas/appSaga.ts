import { SagaIterator } from 'redux-saga';
import { call, put, SagaReturnType, select, takeLatest } from 'redux-saga/effects';

import { Api } from 'API';
import { optionsSelectors } from 'commonCore';

import { appActions } from '../actions';
import { appSelectors } from '../selectors';

type ExchangeRates = SagaReturnType<typeof Api.getExchangeRates>;
function* getExchangeRates(): SagaIterator {
  try {
    const api = yield select(optionsSelectors.getApi);
    const date = yield select(appSelectors.getDate);

    const exchangeRates: ExchangeRates = yield call(() => Api.getExchangeRates(api, date));

    yield put(appActions.getExchangeRatesSuccess());
    yield put(appActions.putExchangeRatesToStore({ exchangeRates }));
  } catch (error) {
    yield put(appActions.getExchangeRatesFailure());
  }
}

function* getExchangeRatesCrypto(): SagaIterator {
  try {
    const exchangeRatesCrypto = yield call(() => Api.getExchangeRatesCrypto());

    yield put(appActions.getExchangeRatesCryptoSuccess());
    yield put(appActions.putExchangeRatesCryptoToStore({ exchangeRatesCrypto }));
  } catch (error) {
    yield put(appActions.getExchangeRatesCryptoFailure());
  }
}

export function* appSaga(): SagaIterator {
  yield takeLatest(appActions.getExchangeRatesRequest, getExchangeRates);
  yield takeLatest(appActions.getExchangeRatesCryptoRequest, getExchangeRatesCrypto);
}
