import { SagaIterator } from 'redux-saga';
import { call, put, SagaReturnType, select, takeLatest } from 'redux-saga/effects';

import { Api } from 'API';
import { optionsSelectors, ApiType } from 'commonCore';

import { appActions } from '../actions';
import { appSelectors, DateType } from '../selectors';

type ExchangeRates = SagaReturnType<typeof Api.getExchangeRates>;
function* getExchangeRates(): SagaIterator {
  try {
    const api: ApiType = yield select(optionsSelectors.getApi);
    if (!api) throw new Error('Нет выбранного API');
    const date: DateType = yield select(appSelectors.getDate);

    const exchangeRates: ExchangeRates = yield call(() => Api.getExchangeRates(api, date));

    yield put(appActions.getExchangeRatesSuccess());
    yield put(appActions.putExchangeRatesToStore({ exchangeRates }));
  } catch (error) {
    yield put(appActions.getExchangeRatesFailure());
  }
}

type ExchangeRatesCrypto = SagaReturnType<typeof Api.getExchangeRatesCrypto>;
function* getExchangeRatesCrypto(): SagaIterator {
  try {
    const exchangeRatesCrypto: ExchangeRatesCrypto = yield call(() => Api.getExchangeRatesCrypto());

    if (exchangeRatesCrypto === 429) yield put(appActions.getExchangeRatesCryptoRequest());
    else {
      yield put(appActions.getExchangeRatesCryptoSuccess());
      yield put(appActions.putExchangeRatesCryptoToStore({ exchangeRatesCrypto }));
    }
  } catch (error) {
    yield put(appActions.getExchangeRatesCryptoFailure());
  }
}

export function* appSaga(): SagaIterator {
  yield takeLatest(appActions.getExchangeRatesRequest, getExchangeRates);
  yield takeLatest(appActions.getExchangeRatesCryptoRequest, getExchangeRatesCrypto);
}
