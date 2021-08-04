import React from 'react';

import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';

import { appSelectors } from 'optionsCore';

export const MainTab = () => {
  const tab = useSelector(appSelectors.getTab);

  return (
    <Box hidden={tab !== 0} p={3}>
      Главная
    </Box>
  );
};
