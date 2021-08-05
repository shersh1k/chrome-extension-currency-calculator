import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { IS_PAGE_TOOLTIP, API, FAVORITE, NAMING } from 'consts';
import { setCacheToStorage, setOptionsToStorage } from 'storage';
import { optionsActions, optionsSelectors } from 'commonCore';
import { appActions, appSelectors } from 'optionsCore';

export const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const tab = useSelector(appSelectors.getTab);
  const isPageTooltip = useSelector(optionsSelectors.getIsPageTooltip);
  const api = useSelector(optionsSelectors.getApi);
  const favorites = useSelector(optionsSelectors.getFavorites);
  const naming = useSelector(optionsSelectors.getNaming);

  const [saveStatus, setSaveStatus] = useState(false);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    dispatch(appActions.setTab({ tab: newValue }));
  };

  const handleDefaultOptions = () => {
    dispatch(optionsActions.setApi({ api: API }));
    dispatch(optionsActions.setFavorites({ favorites: FAVORITE }));
    dispatch(optionsActions.setNaming({ naming: NAMING }));
    dispatch(optionsActions.setIsPageTooltip({ isPageTooltip: IS_PAGE_TOOLTIP }));

    setCacheToStorage({ currencys: null, loadApi: null, loadDate: null });
  };

  const saveOptions = () => {
    setOptionsToStorage({ api, favorites, naming, isPageTooltip }, () => {
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

        <div className={classes.save}>
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
        </div>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    save: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }),
);
