import { IAbbreviation, IExchangeRate } from 'types';

export abstract class BaseApi {
  abstract url: string;

  abstract abbreviation: string;

  abstract name: string;

  abstract getAbbreviations(): Promise<IAbbreviation[]>;

  abstract getExchangeRates(date?: Date): Promise<IExchangeRate[]>;

  abstract get<T>(): Promise<T>;
}
