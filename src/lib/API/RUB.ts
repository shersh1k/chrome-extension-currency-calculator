import { format, isToday } from 'date-fns';

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
      // eslint-disable-next-line no-console
      console.log(error);

      return {} as T;
    }
  }

  public async getExchangeRates(date?: Date) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
