import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { IExchangeRate, NamingTypes } from 'types';
import { getName } from 'helpers';

interface IProps {
  onClick?: (string?: string) => void;
  currency?: IExchangeRate;
  naming?: NamingTypes;
  name?: string;
  scale?: boolean;
  disablePortal?: boolean;
}

const abbreviationSx = { display: 'flex', alignItems: 'center' } as const;

export const CurrencyName: React.FC<IProps> = ({ onClick, currency, naming, scale, name, disablePortal }) => {
  const handleClick = () => {
    if (onClick) onClick(currency?.abbreviation);
  };

  if (currency && naming)
    return (
      <Tooltip
        placement="left"
        slotProps={{ popper: { disablePortal } }}
        title={currency.conversion ? 'Курс при конвертации через основную валюту банка' : ''}
      >
        <Badge badgeContent={currency.conversion ? ' ' : 0} color="secondary" variant="dot">
          {onClick ? (
            <Button sx={abbreviationSx} variant="text" onClick={handleClick}>
              {scale && currency.scale} {getName(currency, naming)}
            </Button>
          ) : (
            <Typography sx={abbreviationSx}>
              {scale && currency.scale} {getName(currency, naming)}
            </Typography>
          )}
        </Badge>
      </Tooltip>
    );

  return <Typography sx={abbreviationSx}>{name}</Typography>;
};
