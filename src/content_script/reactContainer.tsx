import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import { Theme } from 'theme';
import { IPosition } from 'types';
import { ROOT_ID, POPOVER_CONTAINER_ID, ROOT_POPOVER_ID, REACT_ROOT_ID } from 'consts';
import { store } from 'contentScriptCore';

import { App } from './App';

export const { mainRoot, shadowRoot, reactMountPoint } = makeRoot();

export const popoverContainer = makePopoverContainer(shadowRoot);

export const stylesRoot = makeStylesRoot(shadowRoot);

// emotion inserts styles into shadow root instead of document.head;
// speedy (CSSOM insertRule) is disabled because rules inserted that way are lost
// while the root is detached from the document (before first open and after every close)
const emotionCache = createCache({ key: 'shersh1k', container: stylesRoot, speedy: false });

createRoot(reactMountPoint).render(
  <StrictMode>
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Theme>
          <App />
        </Theme>
      </CacheProvider>
    </Provider>
  </StrictMode>,
);

export function appendReactContainer({ x, y }: IPosition) {
  if (document.body.contains(mainRoot)) return;

  mainRoot.style.top = `${y}px`;
  mainRoot.style.left = `${x}px`;
  document.body.append(mainRoot);
}

export function removeReactContainer() {
  if (document.body.contains(mainRoot)) document.body.removeChild(mainRoot);
}

export function changeReactContainerPosition({ x, y }: IPosition) {
  const div = document.getElementById(ROOT_ID);
  if (!div) return;
  const { width } = div.getBoundingClientRect();

  // min position

  x = x < 0 ? 0 : x;

  y = y < 0 ? 0 : y;

  // max position

  x = x > window.innerWidth - width ? window.innerWidth - width : x;

  mainRoot.style.top = `${y}px`;
  mainRoot.style.left = `${x}px`;
}

function makeRoot() {
  const mainDivRoot = document.createElement('div');
  mainDivRoot.id = ROOT_ID;

  // inline styles for root container
  mainDivRoot.style.position = 'fixed';
  // zIndex for showing overall containers
  mainDivRoot.style.zIndex = String(Number.MAX_SAFE_INTEGER);
  mainDivRoot.style.top = '0px';
  mainDivRoot.style.left = '0px';

  const handlePropagation = (event: MouseEvent | KeyboardEvent) => event.stopPropagation();

  mainDivRoot.addEventListener('click', handlePropagation);
  mainDivRoot.addEventListener('mousedown', handlePropagation);
  mainDivRoot.addEventListener('mouseup', handlePropagation);
  mainDivRoot.addEventListener('keydown', handlePropagation);
  mainDivRoot.addEventListener('keypress', handlePropagation);
  mainDivRoot.addEventListener('keyup', handlePropagation);

  // shadow dom for encapsulating styles
  const shadowDivRoot = mainDivRoot.attachShadow({ mode: 'open' });

  // react root
  const reactDivMountPoint = document.createElement('div');
  reactDivMountPoint.id = REACT_ROOT_ID;
  shadowDivRoot.appendChild(reactDivMountPoint);

  return { mainRoot: mainDivRoot, shadowRoot: shadowDivRoot, reactMountPoint: reactDivMountPoint };
}

function makePopoverContainer(shadowDivRoot: ShadowRoot) {
  const div = document.createElement('div');
  const popoverRoot = document.createElement('div');
  popoverRoot.id = ROOT_POPOVER_ID;
  shadowDivRoot.appendChild(popoverRoot);
  div.id = POPOVER_CONTAINER_ID;
  popoverRoot.appendChild(div);

  return div;
}

function makeStylesRoot(shadowDivRoot: ShadowRoot) {
  const div = document.createElement('div');
  shadowDivRoot.appendChild(div);

  return div;
}
