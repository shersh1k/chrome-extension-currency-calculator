import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { Theme } from 'theme';
import { store } from 'popupCore';

import { Popup } from './Popup';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Theme>
        <Popup />
      </Theme>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
