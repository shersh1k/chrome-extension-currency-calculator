import React, { useEffect, useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormControlLabel, Switch } from '@material-ui/core';

import { OptionsButton } from 'atoms';
import { Api } from 'API';
import { setOptionsToStorage } from 'storage';
import { IExchangeRate } from 'types';

interface IProps {
  favorites: string[];
  isPageTooltip: boolean;
  number?: number;
}

export const Popup: React.FC<IProps> = ({ favorites, number, isPageTooltip: defaultIsPageTooltip }) => {
  const classes = useStyles();

  const [isPageTooltip, setIsPageTooltip] = useState<boolean>(defaultIsPageTooltip);
  const [currencys, setCurrencys] = useState<IExchangeRate[]>([]);

  const saveOptions = (event: React.ChangeEvent<{}>, checked: boolean) => {
    setIsPageTooltip(checked);
    setOptionsToStorage({ isPageTooltip: checked });
  };

  useEffect(() => {
    Api.getExchangeRates('BYN').then((rates) => {
      setCurrencys(rates.filter((item) => favorites.find((favorite) => item.abbreviation === favorite)));
    });
  }, [favorites]);

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <OptionsButton />
        <div className={classes.caption}>Курсы валют</div>
      </header>
      <main className={classes.main}>
        {Boolean(number) && number}
        {currencys.map((item) => (
          <div className={classes.row} key={item.id}>
            <span className={classes.abbreviation}>
              {item.scale} {item.name}:
            </span>
            <span className={classes.value}>{item.exchange.toFixed(4)}</span>
          </div>
        ))}
      </main>
      <footer className={classes.footer}>
        <FormControlLabel
          control={<Switch checked={isPageTooltip} onChange={saveOptions} />}
          color="primary"
          label="Работать на странице"
        />
      </footer>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 350,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 10,
      borderBottom: '1px solid grey',
    },
    caption: {
      flex: 1,
      fontSize: 20,
      textAlign: 'center',
    },
    main: {
      maxHeight: 400,
      overflow: 'auto',
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    abbreviation: {
      color: 'black',
      fontSize: 18,
    },
    value: {
      paddingLeft: 10,
      fontSize: 18,
      fontWeight: 700,
      position: 'relative',
      color: 'black',
    },
    exchangeResults: {
      paddingTop: 10,
    },
    footer: {
      borderTop: '1px solid grey',
    },
  }),
);
