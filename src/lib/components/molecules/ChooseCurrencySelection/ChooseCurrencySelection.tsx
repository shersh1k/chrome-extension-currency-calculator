import React from 'react';

import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';


import { ApiTypes } from 'types';

interface IProps {
  api: ApiTypes;
  choosedCurrency: string;
  favorites: string[];
  handleChooseCurrency: (event: SelectChangeEvent<string>) => void;
  container?: Element | (() => Element | null) | null | undefined;
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

const useStyles = makeStyles(() => ({
    selectStyled: {
      '&.MuiInput-underline.Mui-focused:after': {
        borderBottom: 'none',
      },
    },
  }),
);
