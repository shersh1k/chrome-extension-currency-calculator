import { IFetchJsonRequest, IFetchJsonResponse } from 'types';
import { FETCH_JSON_MESSAGE } from 'consts';

// Network requests are made here, not in content scripts: since MV3 content scripts are subject
// to the CORS policy of the page they are injected into, while the service worker uses host_permissions.
chrome.runtime.onMessage.addListener((message: unknown, _sender, sendResponse) => {
  if (!isFetchJsonRequest(message)) return false;

  fetchJson(message.url).then(sendResponse, (error: unknown) => sendResponse({ error: String(error) }));

  // keep the message channel open for the async response
  return true;
});

async function fetchJson(url: string): Promise<IFetchJsonResponse> {
  const response = await fetch(url);
  const data: unknown = response.ok ? await response.json() : null;

  return { ok: response.ok, status: response.status, data };
}

function isFetchJsonRequest(message: unknown): message is IFetchJsonRequest {
  return (
    typeof message === 'object' &&
    message !== null &&
    (message as IFetchJsonRequest).type === FETCH_JSON_MESSAGE &&
    typeof (message as IFetchJsonRequest).url === 'string'
  );
}
