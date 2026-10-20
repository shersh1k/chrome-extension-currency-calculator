import { Api } from 'API';
import { ApiTypes, IExchangeRate, NamingTypes } from 'types';
import { WORK_DAYS_PER_MONTH, WORK_HOURS_PER_DAY, WORK_MONTHS_PER_YEAR } from 'consts';

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

// price of one unit of currency in the API's base currency
function getBaseRate(exchangeRates: IExchangeRate[], api: ApiTypes, currency: string) {
  if (currency === api) return 1;
  const rate = exchangeRates.find((item) => item.abbreviation === currency);
  if (!rate) return null;

  return rate.exchange / rate.scale;
}

// how many working hours it takes to earn the amount with the given monthly salary
export function getWorkHours({
  amount,
  currency,
  salary,
  salaryCurrency,
  api,
  exchangeRates,
}: {
  amount: number;
  currency: string;
  salary: number;
  salaryCurrency: string;
  api: ApiTypes;
  exchangeRates: IExchangeRate[];
}): number | null {
  if (!(salary > 0) || !(amount > 0)) return null;
  const amountRate = getBaseRate(exchangeRates, api, currency);
  const salaryRate = getBaseRate(exchangeRates, api, salaryCurrency);
  if (!amountRate || !salaryRate) return null;

  const months = (amount * amountRate) / (salary * salaryRate);

  return months * WORK_DAYS_PER_MONTH * WORK_HOURS_PER_DAY;
}

const HOURS_PER_MONTH = WORK_DAYS_PER_MONTH * WORK_HOURS_PER_DAY;
const WORK_TIME_UNITS = [
  { label: 'г', minutes: WORK_MONTHS_PER_YEAR * HOURS_PER_MONTH * 60 },
  { label: 'мес', minutes: HOURS_PER_MONTH * 60 },
  { label: 'дн', minutes: WORK_HOURS_PER_DAY * 60 },
  { label: 'ч', minutes: 60 },
  { label: 'мин', minutes: 1 },
];

// shows two largest units, e.g. "1 г 3 мес", "2 дн 5 ч", "40 мин"
export function formatWorkTime(hours: number) {
  let rest = Math.round(hours * 60);
  if (rest < 1) return 'меньше минуты';

  return WORK_TIME_UNITS.map(({ label, minutes }) => {
    const value = Math.floor(rest / minutes);
    rest -= value * minutes;

    return { label, value };
  })
    .filter(({ value }) => value > 0)
    .slice(0, 2)
    .map(({ label, value }) => `${formatMoneySpaces(value)} ${label}`)
    .join(' ');
}
