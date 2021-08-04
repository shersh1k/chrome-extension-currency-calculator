import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';

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
