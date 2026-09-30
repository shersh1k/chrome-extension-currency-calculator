import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';

import { getOptionsFromStorage, StorageOptionsChanges } from 'storage';
import { optionsActions } from 'commonCore';

import { Header, MainTab, CommonTab, ApiTab, AboutTab } from './components';

export const Options = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getOptionsFromStorage((options) => {
      dispatch(optionsActions.setOptions(options));
    });

    chrome.storage.onChanged.addListener(storageChangeListener);

    function storageChangeListener(changes: { [key: string]: chrome.storage.StorageChange }) {
      const options = changes as StorageOptionsChanges;
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
    <Box sx={{ width: 1024, marginLeft: 'calc(50vw - 512px)' }}>
      <Header />
      <MainTab />
      <CommonTab />
      <ApiTab />
      <AboutTab />
    </Box>
  );
};
