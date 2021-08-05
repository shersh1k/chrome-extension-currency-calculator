import { IExchangeRate } from './api';

export interface IStorageOptions {
  isPageTooltip: boolean | null;
  api: ApiTypes | null;
  favorites: string[] | null;
  naming: NamingTypes | null;
  latestCurrency: string | null;
}

export interface IStorageCache {
  currencys: IExchangeRate[] | null;
  loadDate: number | null;
  loadApi: string | null;
}

export type ApiTypes = 'BYN' | 'RUB';

export type NamingTypes = 'SHORT' | 'LONG' | 'LONG (SHORT)' | 'SHORT (LONG)';
