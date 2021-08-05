import { Api } from 'API';
import { ApiTypes, IExchangeRate, NamingTypes } from 'types';

export function getSelectedNumber(val?: string) {
  const selection = val ?? (window.getSelection()?.toString() || '');
  if (selection.length > 15) return;

  return Number(
    selection
      .replace(/,/g, '.')
      .replace(/[^.\d]+/g, '')
      .replace(/^([^.]*\.)|\./g, '$1'),
  );
}

export function getCalculatedRates(
  exchangeRates: IExchangeRate[],
  api: ApiTypes | null,
  favorites: string[],
  currency: string | null,
): IExchangeRate[] | null {
  if (!api || !favorites || !currency) return null;
  const favoriteRates = [api, ...favorites]
    .map((favorite) => exchangeRates.find((loaded) => favorite === loaded.abbreviation))
    .filter((item) => item !== undefined) as IExchangeRate[];

  if (currency === api) return favoriteRates;

  const conversionCurrency = exchangeRates.find((item) => item.abbreviation === currency);
  if (!conversionCurrency) return null;
  const { exchange, scale } = conversionCurrency;
  const conversionRates = [
    {
      abbreviation: Api[api].abbreviation,
      exchange: 1 / exchange,
      id: currency,
      name: Api[api].name,
      scale: 1 / scale,
    },
    ...favoriteRates
      .filter((item) => item.abbreviation !== currency)
      .map((item) => ({
        ...item,
        exchange: (item.exchange / exchange) * scale,
        conversion: true,
      })),
  ];

  return conversionRates;
}

export function getName({ name, abbreviation }: { name: string; abbreviation: string }, nameType: NamingTypes) {
  switch (nameType) {
    case 'LONG':
      return name;
    case 'SHORT':
      return abbreviation;
    case 'LONG (SHORT)':
      return `${name} (${abbreviation})`;
    case 'SHORT (LONG)':
      return `${abbreviation} (${name})`;
    default:
      return '';
  }
}

export function formatMoneySpaces(val: string | number) {
  const money = String(val);
  const [intPiece, floatPiece] = money.split('.');
  const formatedIntPiece = intPiece
    .split('')
    .reverse()
    .reduce((acc, curr, index) => {
      if (index + 1 !== money.length && (index + 1) % 3 === 0) {
        return [...acc, curr, ' '];
      }

      return [...acc, curr];
    }, [] as string[])
    .reverse()
    .join('');
  if (floatPiece) return `${formatedIntPiece}.${floatPiece}`;

  return formatedIntPiece;
}
