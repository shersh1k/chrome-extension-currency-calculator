import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { Provider } from 'react-redux';
import { create } from 'jss';

import { ROOT_ID } from 'consts';
import { IPosition } from 'types';
import { store } from 'core';

import { App } from '../App';

export function startReact() {
  const div = document.createElement('div');
  const shadowRoot = div.attachShadow({ mode: 'open' });
  const mountPoint = document.createElement('div');
  const reactRoot = shadowRoot.appendChild(mountPoint);

  div.id = ROOT_ID;
  div.style.position = 'absolute';
  div.style.zIndex = String(Number.MAX_SAFE_INTEGER);
  div.style.top = '0px';
  div.style.left = '0px';

  const jss = create({
    ...jssPreset(),
    insertionPoint: reactRoot,
  });

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <StylesProvider jss={jss}>
          <App />
        </StylesProvider>
      </Provider>
    </React.StrictMode>,
    mountPoint,
  );

  return div;
}

export function appendReactContainer(div: HTMLDivElement, position: { x: number; y: number }) {
  if (document.body.contains(div)) return;

  div.style.top = `${position.y}px`;
  div.style.left = `${position.x}px`;
  document.body.append(div);
}

export function removeReactContainer(div: HTMLDivElement) {
  if (document.body.contains(div)) document.body.removeChild(div);
}

export function changeReactContainerPosition({ x, y }: IPosition) {
  const div = document.getElementById(ROOT_ID);
  if (!div) return;
  const width  = div.getBoundingClientRect().width;

  // min position
  x = x < 0 ? 0 : x;
  y = y < 0 ? 0 : y;

  // max position
  x = x > window.innerWidth - width ? window.innerWidth - width : x;

  div.style.left = `${x}px`;
  div.style.top = `${y}px`;
}
