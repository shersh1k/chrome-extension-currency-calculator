import React from 'react';

import Button from '@material-ui/core/Button';

interface iProps {
  currency: string;
  onClick: (currency: string) => void;
}

export const ChooseCurrencyButton: React.FC<iProps> = ({ currency, onClick, ...rest }) => {
  const handleChooseCurrency = () => onClick(currency);

  return (
    <Button {...rest} size="small" value={currency} onClick={handleChooseCurrency}>
      {currency}
    </Button>
  );
};
