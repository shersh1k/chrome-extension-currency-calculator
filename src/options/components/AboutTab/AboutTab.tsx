import React from 'react';

import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';

import { appSelectors } from 'optionsCore';

export const AboutTab = () => {
  const tab = useSelector(appSelectors.getTab);

  return (
    <Box hidden={tab !== 3} p={3}>
      О расширении
    </Box>
  );
};
