import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import { Theme } from 'theme';
import { store } from 'optionsCore';

import { Options } from './Options';

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <Theme>
      <Options />
    </Theme>
  </Provider>
);
