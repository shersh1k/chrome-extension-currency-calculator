import { IStorageCache, IStorageOptions } from '../types/storage';
import { API, FAVORITE, IS_PAGE_TOOLTIP, NAMING } from '../constants';

export function getOptionsFromStorage(callback: (options: IStorageOptions) => void): void {
  chrome.storage.sync.get(
    {
      isPageTooltip: IS_PAGE_TOOLTIP,
      api: API,
      favorites: FAVORITE,
      naming: NAMING,
      latestCurrency: API,
    },
    callback as unknown as (items: { [key: string]: unknown }) => void,
  );
}

export function setOptionsToStorage(options: Partial<IStorageOptions>, callback?: () => void): void {
  if (callback) {
    chrome.storage.sync.set(options, callback);
  } else {
    chrome.storage.sync.set(options);
  }
}

export function getCacheFromStorage(): Promise<IStorageCache> {
  return new Promise((resolve) => {
    chrome.storage.local.get({ loadDate: null, currencys: null, loadApi: null }, (cache) =>
      resolve(cache as IStorageCache),
    );
  });
}

export function setCacheToStorage(cache: Partial<IStorageCache>, callback?: () => void): void {
  if (callback) {
    chrome.storage.local.set(cache, callback);
  } else {
    chrome.storage.local.set(cache);
  }
}
