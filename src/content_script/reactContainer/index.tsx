import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { create } from 'jss';

import { Theme } from 'theme';
import { IPosition } from 'types';
import { ROOT_ID, POPOVER_CONTAINER_ID, ROOT_POPOVER_ID, REACT_ROOT_ID } from 'consts';
import { store } from 'contentScriptCore';

import { App } from '../App';

const { mainRoot, shadowRoot, reactMountPoint } = (() => {
  const mainDivRoot = document.createElement('div');
  mainDivRoot.id = ROOT_ID;

  // inline styles for root container
  mainDivRoot.style.position = 'fixed';
  // zIndex for showing over all containers
  mainDivRoot.style.zIndex = String(Number.MAX_SAFE_INTEGER);
  mainDivRoot.style.top = '0px';
  mainDivRoot.style.left = '0px';

  // shadow dom for encapsulating styles
  const shadowDivRoot = mainDivRoot.attachShadow({ mode: 'open' });

  // react root
  const reactDivMountPoint = document.createElement('div');
  reactDivMountPoint.id = REACT_ROOT_ID;
  shadowDivRoot.appendChild(reactDivMountPoint);

  return { mainRoot: mainDivRoot, shadowRoot: shadowDivRoot, reactMountPoint: reactDivMountPoint };
})();

export const popoverContainer = ((shadowDivRoot: ShadowRoot) => {
  const div = document.createElement('div');
  const popoverRoot = document.createElement('div');
  popoverRoot.id = ROOT_POPOVER_ID;
  shadowDivRoot.appendChild(popoverRoot);
  div.id = POPOVER_CONTAINER_ID;
  popoverRoot.appendChild(div);

  return div;
})(shadowRoot);

const stylesRoot = ((shadowDivRoot: ShadowRoot) => {
  const div = document.createComment('jss-insertion-point');
  shadowDivRoot.appendChild(div);

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
        <Theme>
          <App />
        </Theme>
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
  const { width } = div.getBoundingClientRect();

  // min position
  // eslint-disable-next-line no-param-reassign
  x = x < 0 ? 0 : x;
  // eslint-disable-next-line no-param-reassign
  y = y < 0 ? 0 : y;

  // max position
  // eslint-disable-next-line no-param-reassign
  x = x > window.innerWidth - width ? window.innerWidth - width : x;

  mainRoot.style.top = `${y}px`;
  mainRoot.style.left = `${x}px`;
}
