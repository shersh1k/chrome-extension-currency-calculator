import { IStorageCache, IStorageOptions } from 'types';
import { API, FAVORITE, IS_PAGE_TOOLTIP, NAMING } from 'consts';

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
  chrome.storage.sync.set(options, callback);
}

export function getCacheFromStorage(): Promise<IStorageCache> {
  return new Promise((resolve) => {
    chrome.storage.local.get({ loadDate: null, currencys: null, loadApi: null }, (cache) =>
      resolve(cache as IStorageCache),
    );
  });
}

export function setCacheToStorage(cache: Partial<IStorageCache>, callback?: () => void): void {
  chrome.storage.local.set(cache, callback);
}
