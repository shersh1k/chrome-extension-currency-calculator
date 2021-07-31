import { API, FAVORITE, IS_PAGE_TOOLTIP, NAMING } from 'consts';
import { IStorageOptions } from 'types';

export function getOptionsFromStorage(callback: (options: IStorageOptions) => void) {
  chrome.storage.sync.get(
    {
      isPageTooltip: IS_PAGE_TOOLTIP,
      api: API,
      favorites: FAVORITE,
      naming: NAMING,
    },
    callback as (items: { [key: string]: any }) => void,
  );
}

export function setOptionsToStorage(options: Partial<IStorageOptions>, callback?: () => void) {
  chrome.storage.sync.set(options, callback);
}
