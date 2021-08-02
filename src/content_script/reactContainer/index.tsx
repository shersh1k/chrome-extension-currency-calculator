import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { Provider } from 'react-redux';
import { create } from 'jss';

import { ROOT_ID, POPOVER_CONTAINER_ID, ROOT_POPOVER_ID, REACT_ROOT_ID } from 'consts';
import { IPosition } from 'types';
import { store } from 'contentScriptCore';

import { App } from '../App';

const { mainRoot, shadowRoot, reactMountPoint } = (() => {
  const mainRoot = document.createElement('div');
  mainRoot.id = ROOT_ID;

  // inline styles for root container
  mainRoot.style.position = 'fixed';
  // zIndex for showing over all containers
  mainRoot.style.zIndex = String(Number.MAX_SAFE_INTEGER);
  mainRoot.style.top = '0px';
  mainRoot.style.left = '0px';

  // shadow dom for encapsulating styles
  const shadowRoot = mainRoot.attachShadow({ mode: 'open' });

  // react root
  const reactMountPoint = document.createElement('div');
  reactMountPoint.id = REACT_ROOT_ID;
  shadowRoot.appendChild(reactMountPoint);

  return { mainRoot, shadowRoot, reactMountPoint };
})();

export const popoverContainer = ((shadowRoot: ShadowRoot) => {
  const div = document.createElement('div');
  const popoverRoot = document.createElement('div');
  popoverRoot.id = ROOT_POPOVER_ID;
  shadowRoot.appendChild(popoverRoot);
  div.id = POPOVER_CONTAINER_ID;
  popoverRoot.appendChild(div);
  return div;
})(shadowRoot);

const stylesRoot = ((shadowRoot: ShadowRoot) => {
  const div = document.createComment('jss-insertion-point');
  shadowRoot.appendChild(div);
  return div;
})(shadowRoot);

const jss = create({
  ...jssPreset(),
  insertionPoint: stylesRoot,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StylesProvider jss={jss}>
        <App />
      </StylesProvider>
    </Provider>
  </React.StrictMode>,
  reactMountPoint,
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
  const width = div.getBoundingClientRect().width;

  // min position
  x = x < 0 ? 0 : x;
  y = y < 0 ? 0 : y;

  // max position
  x = x > window.innerWidth - width ? window.innerWidth - width : x;

  mainRoot.style.top = `${y}px`;
  mainRoot.style.left = `${x}px`;
}
