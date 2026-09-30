import Typography from '@mui/material/Typography';

import { IExchangeRate } from 'types';
import { formatMoneySpaces } from 'helpers';

interface IProps {
  currency?: IExchangeRate;
  number?: string | number | null;
  value?: number | string;
}

const valueSx = { paddingLeft: '10px', fontWeight: 700 } as const;

export const CurrencyValue: React.FC<IProps> = ({ currency, number, value }) => {
  if (currency)
    return (
      <Typography sx={valueSx}>
        {value ?? formatMoneySpaces(((Number(number ?? 0) / currency.exchange) * currency.scale).toFixed(2))}
      </Typography>
    );

  return <Typography sx={valueSx}>{value}</Typography>;
};
