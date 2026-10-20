import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';

import { getOptionsFromStorage, getOptionsFromChanges } from 'storage';
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
      dispatch(optionsActions.setOptions(getOptionsFromChanges(changes)));
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
