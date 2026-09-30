import { FetchJsonMessageResponse, IFetchJsonRequest, IFetchJsonResponse } from 'types';
import { FETCH_JSON_MESSAGE } from 'consts';

// proxies request through the background service worker (see src/background)
export async function fetchJson<T>(url: string): Promise<IFetchJsonResponse<T>> {
  const response = await chrome.runtime.sendMessage<IFetchJsonRequest, FetchJsonMessageResponse<T> | undefined>({
    type: FETCH_JSON_MESSAGE,
    url,
  });

  if (!response) throw new Error('No response from background service worker');
  if ('error' in response) throw new Error(response.error);

  return response;
}

export async function fetchJsonData<T>(url: string): Promise<T> {
  const { ok, status, data } = await fetchJson<T>(url);
  if (!ok || data === null) throw new Error(`Request failed with status ${status}: ${url}`);

  return data;
}
