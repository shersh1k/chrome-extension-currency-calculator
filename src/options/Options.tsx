import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import { getOptionsFromStorage } from 'storage';
import { getSelectedNumber } from 'helpers';
import { optionsActions } from 'commonCore';
import { appActions } from 'optionsCore';

import { Header, MainTab, CommonTab, ApiTab, AboutTab } from './components';

export const Options = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    getOptionsFromStorage((options) => {
      dispatch(optionsActions.setOptions(options));
    });

    chrome.tabs.executeScript({ code: 'window.getSelection().toString();' }, (selection) => {
      if (!selection) return;

      const number = getSelectedNumber(selection[0]) ?? null;
      if (number) {
        dispatch(appActions.setNumber({ number }));
        dispatch(appActions.setTab({ tab: 1 }));
      }
    });

    chrome.storage.onChanged.addListener(storageChangeListener);

    function storageChangeListener(options: { [key: string]: chrome.storage.StorageChange }) {
      dispatch(
        optionsActions.setOptions({
          isPageTooltip: options.isPageTooltip?.newValue,
          api: options.api?.newValue,
          favorites: options.favorites?.newValue,
          naming: options.naming?.newValue,
        }),
      );
    }

    return () => {
      chrome.storage.onChanged.removeListener(storageChangeListener);
    };
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Header />
      <MainTab />
      <CommonTab />
      <ApiTab />
      <AboutTab />
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: 1024,
      marginLeft: 'calc(50vw - 512px)',
    },
  }),
);
