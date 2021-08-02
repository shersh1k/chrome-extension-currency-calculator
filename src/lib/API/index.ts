import { ApiTypes } from 'types';
import { BYN } from './BYN';
import { RUB } from './RUB';

class ApiService {
  BYN = new BYN();
  RUB = new RUB();

  public async getAbbreviations(apiType: ApiTypes) {
    const abbreviations = await this[apiType].getAbbreviations();

    return abbreviations;
  }

  public async getExchangeRates(apiType: ApiTypes, date?: Date) {
    const abbreviations = await this[apiType].getExchangeRates(date);

    return abbreviations;
  }
}

export const Api = new ApiService();