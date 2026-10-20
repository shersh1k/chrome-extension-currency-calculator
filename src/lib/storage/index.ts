import { IStorageCache, IStorageOptions } from 'types';
import { API, FAVORITE, IS_HONEST_PRICE, IS_PAGE_TOOLTIP, NAMING, SALARY } from 'consts';

// chrome.storage.onChanged payload for options stored in sync area
export type StorageOptionsChanges = {
  [K in keyof IStorageOptions]?: { newValue?: IStorageOptions[K]; oldValue?: IStorageOptions[K] };
};

// picks new values of changed options, unchanged ones stay undefined
export function getOptionsFromChanges(changes: { [key: string]: chrome.storage.StorageChange }) {
  const options = changes as StorageOptionsChanges;

  return {
    isPageTooltip: options.isPageTooltip?.newValue,
    api: options.api?.newValue,
    favorites: options.favorites?.newValue,
    naming: options.naming?.newValue,
    latestCurrency: options.latestCurrency?.newValue,
    isHonestPrice: options.isHonestPrice?.newValue,
    salary: options.salary?.newValue,
    salaryCurrency: options.salaryCurrency?.newValue,
  };
}

export function getOptionsFromStorage(callback: (options: IStorageOptions) => void): void {
  chrome.storage.sync
    .get<IStorageOptions>({
      isPageTooltip: IS_PAGE_TOOLTIP,
      api: API,
      favorites: FAVORITE,
      naming: NAMING,
      latestCurrency: API,
      isHonestPrice: IS_HONEST_PRICE,
      salary: SALARY,
      salaryCurrency: null,
    })
    .then(callback);
}

export function setOptionsToStorage(options: Partial<IStorageOptions>, callback?: () => void): void {
  chrome.storage.sync.set(options).then(callback);
}

export function getCacheFromStorage(): Promise<IStorageCache> {
  return chrome.storage.local.get<IStorageCache>({ loadDate: null, currencys: null, loadApi: null });
}

export function setCacheToStorage(cache: Partial<IStorageCache>, callback?: () => void): void {
  chrome.storage.local.set(cache).then(callback);
}
