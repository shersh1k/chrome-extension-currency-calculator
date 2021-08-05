import { ApiTypes, IExchangeRateCrypto } from 'types';
import { BYN } from './BYN';
import { RUB } from './RUB';

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

  private cryptoUrl = 'https://api.coincap.io/v2/assets';

  public async getExchangeRatesCrypto() {
    const { data } = await fetch(this.cryptoUrl).then((res) => res.json());
    const exchangeRatesCrypto: IExchangeRateCrypto[] = data
      .slice(0, this.cryptoCount)
      .map((item: { symbol: string; id: string; name: string; priceUsd: number; rank: number }) => ({
        abbreviation: item.symbol,
        id: item.id,
        name: item.name,
        priceUsd: item.priceUsd,
        rank: item.rank,
      }));

    return exchangeRatesCrypto;
  }
}

export const Api = new ApiService();
