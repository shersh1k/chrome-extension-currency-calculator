import { useDispatch } from 'react-redux';
import { RowComponentProps } from 'react-window';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { IAbbreviation } from 'types';
import { optionsActions } from 'commonCore';

export interface ICurrencyRowProps {
  items: IAbbreviation[];
  favorites: string[];
}

export const CurrencyRow = ({ index, style, items, favorites }: RowComponentProps<ICurrencyRowProps>) => {
  const dispatch = useDispatch();

  const handleFavoriteChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const abbreviationString = event.target.value;

    const newFavorites = checked
      ? [...favorites, abbreviationString]
      : favorites.filter((item) => item !== abbreviationString);

    dispatch(optionsActions.setFavorites({ favorites: newFavorites }));
  };

  return (
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
        label={`${items[index].name} (${items[index].abbreviation})`}
      />
    </div>
  );
};
