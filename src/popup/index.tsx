import React from 'react';
import ReactDOM from 'react-dom';

import { getSelectedNumber } from 'helpers';
import { getOptionsFromStorage } from 'storage';

import { Popup } from './Popup';

getOptionsFromStorage(({ favorites, isPageTooltip, naming, api }) => {
  chrome.tabs.executeScript({ code: 'window.getSelection().toString();' }, (selection) => {
    let number;
    if (selection) number = getSelectedNumber(selection[0]);
    ReactDOM.render(
      <React.StrictMode>
        <Popup number={number} isPageTooltip={isPageTooltip} api={api} favorites={favorites} naming={naming} />
      </React.StrictMode>,
      document.getElementById('root'),
    );
  });
});
