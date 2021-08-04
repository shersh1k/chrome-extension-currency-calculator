export interface IStorageOptions {
  isPageTooltip: boolean | null;
  api: ApiTypes | null;
  favorites: string[] | null;
  naming: NamingTypes | null;
}

export type ApiTypes = 'BYN' | 'RUB';

export type NamingTypes = 'SHORT' | 'LONG' | 'LONG (SHORT)' | 'SHORT (LONG)';
