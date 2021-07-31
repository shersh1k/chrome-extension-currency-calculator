import React from 'react';
import ReactDOM from 'react-dom';

import { getSelectedNumber } from 'helpers';
import { getOptionsFromStorage } from 'storage';

import { Popup } from './Popup';

getOptionsFromStorage(({ favorites, isPageTooltip }) => {
  chrome.tabs.executeScript({ code: 'window.getSelection().toString();' }, (selection) => {
    let number;
    if (selection) number = getSelectedNumber(selection[0]);
    ReactDOM.render(
      <React.StrictMode>
        <Popup favorites={favorites} isPageTooltip={isPageTooltip} number={number} />
      </React.StrictMode>,
      document.getElementById('root'),
    );
  });
});
