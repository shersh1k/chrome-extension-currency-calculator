import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { ApiTypes } from 'types';

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
      MenuProps={{ container }}
      className={classes.selectStyled}
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

const useStyles = makeStyles(() =>
  createStyles({
    selectStyled: {
      '&.MuiInput-underline.Mui-focused:after': {
        borderBottom: 'none',
      },
    },
  }),
);
