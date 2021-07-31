export interface IStorageOptions {
  isPageTooltip: boolean;
  api: ApiTypes;
  favorites: string[];
  naming: NamingTypes;
}

export type ApiTypes = 'BYN' | 'RUB';

export type NamingTypes = 'SHORT' | 'LONG' | 'LONG (SHORT)' | 'SHORT (LONG)';
