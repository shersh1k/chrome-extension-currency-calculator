import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';

import { NamingTypes } from 'types';
import { API, WORK_DAYS_PER_MONTH, WORK_HOURS_PER_DAY, WORK_MONTHS_PER_YEAR } from 'consts';
import { optionsActions, optionsSelectors } from 'commonCore';
import { appSelectors } from 'optionsCore';

export const CommonTab = () => {
  const dispatch = useDispatch();

  const tab = useSelector(appSelectors.getTab);
  const isPageTooltip = useSelector(optionsSelectors.getIsPageTooltip);
  const naming = useSelector(optionsSelectors.getNaming);
  const api = useSelector(optionsSelectors.getApi) ?? API;
  const favorites = useSelector(optionsSelectors.getFavorites);
  const isHonestPrice = useSelector(optionsSelectors.getIsHonestPrice);
  const salary = useSelector(optionsSelectors.getSalary);
  const salaryCurrency = useSelector(optionsSelectors.getSalaryCurrency);

  // keep chosen salary currency in the list even if it was removed from favorites
  const salaryCurrencys = [...new Set([api, ...favorites, ...(salaryCurrency ? [salaryCurrency] : [])])];

  const handleNamingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(optionsActions.setNaming({ naming: event.target.value as NamingTypes }));
  };

  const handleIsPageToolTip = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    dispatch(optionsActions.setIsPageTooltip({ isPageTooltip: checked }));
  };

  const handleIsHonestPrice = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    dispatch(optionsActions.setIsHonestPrice({ isHonestPrice: checked }));
  };

  const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSalary = Number(event.target.value);
    dispatch(optionsActions.setSalary({ salary: newSalary > 0 ? newSalary : 0 }));
  };

  const handleSalaryCurrencyChange = (event: SelectChangeEvent) => {
    dispatch(optionsActions.setSalaryCurrency({ salaryCurrency: event.target.value }));
  };

  return (
    <Box hidden={tab !== 1} sx={{ p: 3 }}>
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
      <FormControl fullWidth style={{ marginTop: 25 }}>
        <FormLabel>Честная цена</FormLabel>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, marginTop: 1 }}>
          <TextField
            label="Зарплата в месяц"
            slotProps={{ htmlInput: { min: 0 } }}
            type="number"
            value={salary || ''}
            variant="standard"
            onChange={handleSalaryChange}
          />
          <Select value={salaryCurrency || api} variant="standard" onChange={handleSalaryCurrencyChange}>
            {salaryCurrencys.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          <FormControlLabel
            control={<Switch checked={isHonestPrice} color="primary" onChange={handleIsHonestPrice} />}
            label="Показывать в списке валют"
          />
        </Box>
        <FormHelperText>
          Сколько нужно проработать, чтобы заработать сумму. Рабочий день — {WORK_HOURS_PER_DAY} ч, месяц —{' '}
          {WORK_DAYS_PER_MONTH} рабочих дней, год — {WORK_MONTHS_PER_YEAR} рабочих месяцев
        </FormHelperText>
      </FormControl>
    </Box>
  );
};
