export interface IExchangeRate {
  abbreviation: string;
  id: number | string;
  name: string;
  exchange: number;
  scale: number;
  conversion?: boolean;
}
export interface IExchangeRateCrypto {
  abbreviation: string;
  id: number | string;
  name: string;
  priceUsd: number;
  rank: number;
}

export interface IAbbreviation {
  abbreviation: string;
  id: number | string;
  name: string;
}
