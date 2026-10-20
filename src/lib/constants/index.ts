import { ApiTypes, IFetchJsonRequest, NamingTypes } from 'types';

export const ROOT_ID = 'shersh1k_currency_calculator_root';
export const REACT_ROOT_ID = 'shersh1k_currency_calculator_react_root';
export const ROOT_POPOVER_ID = 'shersh1k_currency_calculator_popover_root';
export const POPOVER_CONTAINER_ID = 'shersh1k_currency_calculator_popover_container';

export const API: ApiTypes = 'BYN';
export const NAMING: NamingTypes = 'SHORT';
export const FAVORITE: string[] = ['USD', 'EUR'];
export const IS_PAGE_TOOLTIP = true;
export const IS_HONEST_PRICE = false;
export const SALARY = 0;

// working time used by "honest price": month and year are counted in working days, not calendar ones
export const WORK_HOURS_PER_DAY = 8;
export const WORK_DAYS_PER_MONTH = 21;
export const WORK_MONTHS_PER_YEAR = 12;

export const FETCH_JSON_MESSAGE: IFetchJsonRequest['type'] = 'FETCH_JSON';
