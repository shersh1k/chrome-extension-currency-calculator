import { ApiTypes, IExchangeRateCrypto } from 'types';

import { BYN } from './BYN';
import { fetchJson } from './fetchJson';
import { RUB } from './RUB';

export { ExchangeRatesError } from './BaseApi';

class ApiService {
  BYN = new BYN();

  RUB = new RUB();

  public async getAbbreviations(apiType: ApiTypes) {
    const abbreviations = await this[apiType].getAbbreviations();

    return abbreviations;
  }

  public async getExchangeRates(apiType: ApiTypes, date: Date = new Date()) {
    const exchangeRates = await this[apiType].getExchangeRates(date);

    return exchangeRates;
  }

  // TODO?: move to another class
  private cryptoCount = 10;

  private cryptoUrl = `https://api.coinlore.net/api/tickers/?start=0&limit=${this.cryptoCount}`;

  public async getExchangeRatesCrypto() {
    const { ok, status, data } = await fetchJson<{ data: ICoinlore[] }>(this.cryptoUrl);
    if (status === 429) return 429;
    if (!ok || !data) throw new Error(`Request failed with status ${status}: ${this.cryptoUrl}`);

    const exchangeRatesCrypto: IExchangeRateCrypto[] = data.data.slice(0, this.cryptoCount).map((item) => ({
      abbreviation: item.symbol,
      id: item.id,
      name: item.name,
      priceUsd: Number(item.price_usd),
      rank: item.rank,
    }));

    return exchangeRatesCrypto;
  }
}

interface ICoinlore {
  id: string;
  symbol: string;
  name: string;
  rank: number;
  price_usd: string;
}

export const Api = new ApiService();
