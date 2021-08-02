import React from 'react';

import { ApiTypes } from 'types';
import { MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface IProps {
  api: ApiTypes;
  choosedCurrency: string;
  favorites: string[];
  handleChooseCurrency: (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
  container?: React.ReactInstance | (() => React.ReactInstance | null) | null | undefined;
}

export const ChooseCurrencySelection: React.FC<IProps> = ({
  api,
  favorites,
  choosedCurrency,
  handleChooseCurrency,
  container,
}) => {
  const classes = useStyles();
  return (
    <Select
      className={classes.selectStyled}
      MenuProps={{ container }}
      value={choosedCurrency}
      onChange={handleChooseCurrency}
    >
      {[api, ...favorites].map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectStyled: {
      '&.MuiInput-underline.Mui-focused:after': {
        borderBottom: 'none',
      },
    },
  }),
);
