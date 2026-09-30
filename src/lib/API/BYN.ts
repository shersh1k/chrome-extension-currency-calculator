import { format, isToday } from 'date-fns';

import { IExchangeRate } from 'types';

import { BaseApi } from './BaseApi';
import { fetchJsonData } from './fetchJson';

export class BYN extends BaseApi {
  url = 'https://www.nbrb.by/api/exrates/rates';

  abbreviation = 'BYN';

  name = 'Белорусский рубль';

  public async load(date: Date) {
    const query = (periodicity: 0 | 1) =>
      new URLSearchParams({
        periodicity: String(periodicity),
        ...(!isToday(date) && { ondate: format(date, 'yyyy-M-d') }),
      });

    const data = await Promise.all([
      fetchJsonData<IBYN[]>(`${this.url}?${query(0)}`),
      fetchJsonData<IBYN[]>(`${this.url}?${query(1)}`),
    ]);

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
