import { IStorageCache, IStorageOptions } from 'types';
import { API, FAVORITE, IS_PAGE_TOOLTIP, NAMING } from 'consts';

// chrome.storage.onChanged payload for options stored in sync area
export type StorageOptionsChanges = {
  [K in keyof IStorageOptions]?: { newValue?: IStorageOptions[K]; oldValue?: IStorageOptions[K] };
};

export function getOptionsFromStorage(callback: (options: IStorageOptions) => void): void {
  chrome.storage.sync
    .get<IStorageOptions>({
      isPageTooltip: IS_PAGE_TOOLTIP,
      api: API,
      favorites: FAVORITE,
      naming: NAMING,
      latestCurrency: API,
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
