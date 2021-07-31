import { format, isToday } from 'date-fns';
import qs from 'qs';

import { IExchangeRate } from 'types';

import { BaseApi } from './BaseApi';

export class RUB extends BaseApi {
  url = 'https://www.cbr-xml-daily.ru';

  abbreviation = 'RUB';

  name = 'Российский рубль';

  public async get<T>(date?: Date) {
    try {
      const url = `${this.url}/${date && !isToday(date) ? `archive/${format(date, 'yyyy/MM/dd')}/` : ''}daily_json.js`;
      const result = await fetch(url);
      const data: T = await result.json();
      return data;
    } catch (error) {
      console.log(error);
      return {} as T;
    }
  }

  public async getExchangeRates(date?: Date) {
    const data = await this.get<any>(date);
    const valute: IRub[] = Object.values(data.Valute);

    const result: IExchangeRate[] = valute.map((item) => ({
      id: item.ID,
      abbreviation: item.CharCode,
      exchange: item.Value,
      name: item.Name,
      scale: item.Nominal,
    }));

    return result;
  }

  public async getAbbreviations() {
    const data: any = await this.get();
    const valute: IRub[] = Object.values(data.Valute);

    return valute.map((item) => ({ abbreviation: item.CharCode, id: item.ID, name: item.Name }));
  }
}

export interface IRub {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}
