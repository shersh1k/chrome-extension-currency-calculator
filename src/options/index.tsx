import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import { Theme } from 'theme';
import { store } from 'optionsCore';

import { Options } from './Options';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <Theme>
      <Options />
    </Theme>
  </Provider>,
);
