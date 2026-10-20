import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { IS_PAGE_TOOLTIP, API, FAVORITE, NAMING, IS_HONEST_PRICE, SALARY } from 'consts';
import { setCacheToStorage, setOptionsToStorage } from 'storage';
import { optionsActions, optionsSelectors } from 'commonCore';
import { appActions, appSelectors } from 'optionsCore';

export const Header = () => {
  const dispatch = useDispatch();

  const tab = useSelector(appSelectors.getTab);
  const isPageTooltip = useSelector(optionsSelectors.getIsPageTooltip);
  const api = useSelector(optionsSelectors.getApi);
  const favorites = useSelector(optionsSelectors.getFavorites);
  const naming = useSelector(optionsSelectors.getNaming);
  const isHonestPrice = useSelector(optionsSelectors.getIsHonestPrice);
  const salary = useSelector(optionsSelectors.getSalary);
  const salaryCurrency = useSelector(optionsSelectors.getSalaryCurrency);

  const [saveStatus, setSaveStatus] = useState(false);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    dispatch(appActions.setTab({ tab: newValue }));
  };

  const handleDefaultOptions = () => {
    dispatch(optionsActions.setApi({ api: API }));
    dispatch(optionsActions.setFavorites({ favorites: FAVORITE }));
    dispatch(optionsActions.setNaming({ naming: NAMING }));
    dispatch(optionsActions.setIsPageTooltip({ isPageTooltip: IS_PAGE_TOOLTIP }));
    dispatch(optionsActions.setIsHonestPrice({ isHonestPrice: IS_HONEST_PRICE }));
    dispatch(optionsActions.setSalary({ salary: SALARY }));
    dispatch(optionsActions.setSalaryCurrency({ salaryCurrency: null }));

    setCacheToStorage({ currencys: null, loadApi: null, loadDate: null });
  };

  const saveOptions = () => {
    setOptionsToStorage({ api, favorites, naming, isPageTooltip, isHonestPrice, salary, salaryCurrency }, () => {
      setSaveStatus(true);
      const id = setTimeout(() => {
        setSaveStatus(false);
      }, 1000);

      return () => clearTimeout(id);
    });
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Tabs value={tab} onChange={handleChangeTab}>
          <Tab label="Главная" />
          <Tab label="Общие" />
          <Tab label="Банки (API)" />
          <Tab label="О расширении" />
        </Tabs>

        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={handleDefaultOptions}>
            <Typography variant="button">Сбросить</Typography>
          </Button>
          <Button style={{ marginLeft: 15 }} variant="contained" onClick={saveOptions}>
            {saveStatus ? (
              <Typography color="primary" variant="button">
                Сохранено!
              </Typography>
            ) : (
              <Typography variant="button">Сохранить</Typography>
            )}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
