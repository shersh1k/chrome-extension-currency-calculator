import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import { Theme } from 'theme';
import { store } from 'popupCore';

import { Popup } from './Popup';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <Popup />
      </Theme>
    </Provider>
  </React.StrictMode>
);
