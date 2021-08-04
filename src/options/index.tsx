import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { Theme } from 'theme';
import { store } from 'optionsCore';

import { Options } from './Options';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <Options />
      </Theme>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
