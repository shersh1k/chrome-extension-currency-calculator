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
    const result = await fetch(this.cryptoUrl).then((res) => {
      if (res.status === 429) return 429;

      return res.json();
    });
    if (result === 429) return 429;

    const exchangeRatesCrypto: IExchangeRateCrypto[] = result.data
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
