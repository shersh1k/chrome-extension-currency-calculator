import { SagaIterator } from 'redux-saga';
import { call, put, SagaReturnType, select, takeLatest } from 'redux-saga/effects';

import { Api } from 'API';
import { IExchangeRateCrypto } from 'types';
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
    const { data } = yield call(() => fetch('https://api.coincap.io/v2/assets').then((res) => res.json()));
    const exchangeRatesCrypto: IExchangeRateCrypto[] = data
      .slice(0, 10)
      .map((item: { symbol: string; id: string; name: string; priceUsd: number; rank: number }) => ({
        abbreviation: item.symbol,
        id: item.id,
        name: item.name,
        priceUsd: item.priceUsd,
        rank: item.rank,
      }));

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
