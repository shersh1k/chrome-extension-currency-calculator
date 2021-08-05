import React from 'react';

import { useDispatch } from 'react-redux';
import { ListChildComponentProps } from 'react-window';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { IAbbreviation } from 'types';
import { optionsActions } from 'commonCore';

interface IProps {
  items: IAbbreviation[];
  favorites: string[];
}

export const CurrencyRow = ({ items, favorites }: IProps) => {
  const dispatch = useDispatch();
  const handleFavoriteChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const abbreviationString = event.target.value;

    const newFavorites = checked
      ? [...favorites, abbreviationString]
      : favorites.filter((item) => item !== abbreviationString);

    dispatch(optionsActions.setFavorites({ favorites: newFavorites }));
  };

  return ({ index, style }: ListChildComponentProps) => (
    <div style={{ paddingLeft: 15, ...style }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={Boolean(favorites.find((fav) => fav === items[index].abbreviation))}
            color="primary"
            size="small"
            value={items[index].abbreviation}
            onChange={handleFavoriteChange}
          />
        }
        key={items[index].id}
        label={`${items[index].name} (${items[index].abbreviation})`}
      />
    </div>
  );
};
