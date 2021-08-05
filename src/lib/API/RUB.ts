// eslint-disable-next-line import/no-duplicates
import format from 'date-fns/format';
// eslint-disable-next-line import/no-duplicates
import isToday from 'date-fns/isToday';

import { IExchangeRate } from 'types';

import { BaseApi } from './BaseApi';

export class RUB extends BaseApi {
  url = 'https://www.cbr-xml-daily.ru';

  abbreviation = 'RUB';

  name = 'Российский рубль';

  public async load(date: Date) {
    const url = `${this.url}/${!isToday(date) ? `archive/${format(date, 'yyyy/MM/dd')}/` : ''}daily_json.js`;
    const result = await fetch(url);
    const data = await result.json();
    const valute: IRUB[] = Object.values(data.Valute);

    const currencys: IExchangeRate[] = valute.map((item) => ({
      id: item.ID,
      abbreviation: item.CharCode,
      exchange: item.Value,
      name: item.Name,
      scale: item.Nominal,
    }));

    return currencys;
  }
}

interface IRUB {
  ID: string;
  NumCode: string;
  CharCode: string;
  Nominal: number;
  Name: string;
  Value: number;
  Previous: number;
}
