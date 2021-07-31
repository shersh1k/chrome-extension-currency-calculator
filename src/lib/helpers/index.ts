import { IExchangeRate, NamingTypes } from 'types';

export function formatMoneySpaces(money: string | number) {
  if (typeof money === 'number') money = String(money);
  const [intPiece, floatPiece] = money.split('.');
  const formatedIntPiece = intPiece
    .split('')
    .reverse()
    .reduce((acc, curr, index) => {
      if (typeof money === 'number') money = String(money);
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

export function getSelectedNumber(val?: string) {
  const selection = val ?? (window.getSelection()?.toString() || '');
  if (selection.length > 15) return;
  return Number(
    selection
      .replace(/\,/g, '.')
      .replace(/[^.\d]+/g, '')
      .replace(/^([^\.]*\.)|\./g, '$1'),
  );
}
