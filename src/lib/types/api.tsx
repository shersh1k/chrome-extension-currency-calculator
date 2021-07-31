export interface IExchangeRate {
  abbreviation: string;
  id: number | string;
  name: string;
  exchange: number;
  scale: number;
  conversion?: boolean;
}

export interface IAbbreviation {
  abbreviation: string;
  id: number | string;
  name: string;
}
