import MenuItem from '@mui/material/MenuItem';
import { PortalProps } from '@mui/material/Portal';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { ApiTypes } from 'types';

interface IProps {
  api: ApiTypes;
  choosedCurrency: string;
  favorites: string[];
  handleChooseCurrency: (event: SelectChangeEvent) => void;
  container?: PortalProps['container'];
}

export const ChooseCurrencySelection: React.FC<IProps> = ({
  api,
  favorites,
  choosedCurrency,
  handleChooseCurrency,
  container,
}) => {
  return (
    <Select
      MenuProps={{ container }}
      sx={{ '&.MuiInput-underline.Mui-focused:after': { borderBottom: 'none' } }}
      value={choosedCurrency}
      variant="standard"
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
