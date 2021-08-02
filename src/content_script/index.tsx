import { store, appActions, optionsActions } from 'contentScriptCore';
import { getOptionsFromStorage } from 'storage';
import { getSelectedNumber } from 'helpers';

import { appendReactContainer, removeReactContainer } from './reactContainer';

getOptionsFromStorage((options) => {
  store.dispatch(optionsActions.setOptions(options));

  document.addEventListener('mouseup', documentMouseUpHandler);
  document.addEventListener('mousedown', documentMouseDownHandler);

  store.subscribe(storeListener);
  chrome.storage.onChanged.addListener(storageChangeListener);
});

function documentMouseUpHandler(event: MouseEvent) {
  setTimeout(() => {
    const number = getSelectedNumber();
    if (!number) return;

    store.dispatch(appActions.open({ number, position: { x: event.clientX, y: event.clientY } }));
  }, 100);
}

function documentMouseDownHandler() {
  const { isPinned, isShowed } = store.getState().app;
  if (!isPinned && isShowed) store.dispatch(appActions.close());
}

function storeListener() {
  const { isShowed, position } = store.getState().app;
  if (isShowed) appendReactContainer(position);
  else removeReactContainer();
}

function storageChangeListener(options: { [key: string]: chrome.storage.StorageChange }) {
  store.dispatch(
    optionsActions.setOptions({
      isPageTooltip: options.isPageTooltip?.newValue,
      api: options.api?.newValue,
      favorites: options.favorites?.newValue,
      naming: options.naming?.newValue,
    }),
  );
}
