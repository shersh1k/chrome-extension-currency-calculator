import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import { Theme } from 'theme';
import { store } from 'popupCore';

import { Popup } from './Popup';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <Theme>
        <Popup />
      </Theme>
    </Provider>
  </StrictMode>,
);
