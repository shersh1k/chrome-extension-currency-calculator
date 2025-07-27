import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Switch from '@mui/material/Switch';

import { NamingTypes } from 'types';
import { optionsActions, optionsSelectors } from 'commonCore';
import { appSelectors } from 'optionsCore';

export const CommonTab = () => {
  const dispatch = useDispatch();

  const tab = useSelector(appSelectors.getTab);
  const isPageTooltip = useSelector(optionsSelectors.getIsPageTooltip);
  const naming = useSelector(optionsSelectors.getNaming);

  const handleNamingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(optionsActions.setNaming({ naming: event.target.value as NamingTypes }));
  };

  const handleIsPageToolTip = (event: React.ChangeEvent<{}>, checked: boolean) => {
    dispatch(optionsActions.setIsPageTooltip({ isPageTooltip: checked }));
  };

  return (
    <Box hidden={tab !== 1} p={3}>
      <FormControl>
        <FormControlLabel
          control={<Switch checked={Boolean(isPageTooltip)} color="primary" onChange={handleIsPageToolTip} />}
          label="Работать на странице"
        />
      </FormControl>
      <FormControl fullWidth style={{ marginTop: 25 }}>
        <FormLabel>Как отображать названия валюты</FormLabel>
        <RadioGroup value={naming} onChange={handleNamingChange}>
          <FormControlLabel control={<Radio color="primary" />} label="USD" value="SHORT" />
          <FormControlLabel control={<Radio color="primary" />} label="Доллар США" value="LONG" />
          <FormControlLabel control={<Radio color="primary" />} label="Доллар США (USD)" value="LONG (SHORT)" />
          <FormControlLabel control={<Radio color="primary" />} label="USD (Доллар США)" value="SHORT (LONG)" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
