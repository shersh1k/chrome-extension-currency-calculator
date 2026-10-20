import { useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { CurrencyRow, CurrencyValue } from 'atoms';
import { ApiTypes, IExchangeRate } from 'types';
import { WORK_DAYS_PER_MONTH, WORK_HOURS_PER_DAY } from 'consts';
import { formatWorkTime, getWorkHours } from 'helpers';
import { optionsSelectors } from 'commonCore';

interface IProps {
  api: ApiTypes;
  currency: string;
  number?: string | number | null;
  exchangeRates: IExchangeRate[];
  disablePortal?: boolean;
}

// time needed to earn the entered amount, counted in working days/months
export const HonestPrice: React.FC<IProps> = ({ api, currency, number, exchangeRates, disablePortal }) => {
  const isHonestPrice = useSelector(optionsSelectors.getIsHonestPrice);
  const salary = useSelector(optionsSelectors.getSalary);
  const salaryCurrency = useSelector(optionsSelectors.getSalaryCurrency);

  if (!isHonestPrice) return null;

  const hours = getWorkHours({
    amount: Number(number ?? 0),
    currency,
    salary,
    salaryCurrency: salaryCurrency || api,
    api,
    exchangeRates,
  });
  if (hours === null) return null;

  return (
    <CurrencyRow>
      <Tooltip
        placement="left"
        slotProps={{ popper: { disablePortal } }}
        title={`Столько нужно работать, чтобы заработать эту сумму. Рабочий день — ${WORK_HOURS_PER_DAY} ч, месяц — ${WORK_DAYS_PER_MONTH} рабочих дней`}
      >
        <Typography>Честная цена</Typography>
      </Tooltip>
      <CurrencyValue value={formatWorkTime(hours)} />
    </CurrencyRow>
  );
};
