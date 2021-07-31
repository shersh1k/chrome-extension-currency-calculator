import qs from 'qs';
import { format, isToday } from 'date-fns';

import { IExchangeRate } from 'types';

import { BaseApi } from './BaseApi';

export class BYN extends BaseApi {
  url = 'https://www.nbrb.by/api/exrates/rates';

  abbreviation = 'BYN';

  name = 'Белорусский рубль';

  periodicity = 0;

  public async get<T>(date?: Date) {
    try {
      const body = {
        periodicity: this.periodicity,
        ...(date && !isToday(date) && { ondate: format(date, 'yyyy-M-d') }),
      };
      const result = await fetch(`${this.url}?${qs.stringify(body)}`);
      const data: T = await result.json();
      return data;
    } catch (error) {
      console.log(error);
      return {} as T;
    }
  }

  public async getExchangeRates(date?: Date) {
    const data = await this.get<IByn[]>(date);

    const result: IExchangeRate[] = data.map((item) => ({
      id: item.Cur_ID,
      abbreviation: item.Cur_Abbreviation,
      exchange: item.Cur_OfficialRate,
      name: item.Cur_Name,
      scale: item.Cur_Scale,
    }));

    return result;
  }

  public async getAbbreviations() {
    const data: IByn[] = await this.get();

    return data.map((item) => ({ abbreviation: item.Cur_Abbreviation, id: item.Cur_ID, name: item.Cur_Name }));
  }
}

export interface IByn {
  Cur_Abbreviation: string;
  Cur_ID: number;
  Cur_Name: string;
  Cur_OfficialRate: number;
  Cur_Scale: number;
  Date: string;
}
