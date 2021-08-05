/* eslint-disable import/no-duplicates */
/* eslint-disable camelcase */
import format from 'date-fns/format';
import isToday from 'date-fns/isToday';
import qs from 'qs';
import { IExchangeRate } from 'types';

import { BaseApi } from './BaseApi';

export class BYN extends BaseApi {
  url = 'https://www.nbrb.by/api/exrates/rates';

  abbreviation = 'BYN';

  name = 'Белорусский рубль';

  public async load(date: Date) {
    const body = (periodicity: 0 | 1) => ({
      periodicity,
      ...(!isToday(date) && { ondate: format(date, 'yyyy-M-d') }),
    });

    const result = await Promise.all([
      fetch(`${this.url}?${qs.stringify(body(0))}`),
      fetch(`${this.url}?${qs.stringify(body(1))}`),
    ]);

    const data: IBYN[][] = await Promise.all(result.map((item) => item.json()));

    const newCurrencys: IExchangeRate[] = data.flat().map((item) => ({
      id: item.Cur_ID,
      abbreviation: item.Cur_Abbreviation,
      exchange: item.Cur_OfficialRate,
      name: item.Cur_Name,
      scale: item.Cur_Scale,
    }));

    return newCurrencys;
  }
}

interface IBYN {
  Cur_Abbreviation: string;
  Cur_ID: number;
  Cur_Name: string;
  Cur_OfficialRate: number;
  Cur_Scale: number;
  Date: string;
}
