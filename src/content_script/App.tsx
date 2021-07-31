import React from 'react';

import { useSelector } from 'react-redux';

import { appSelectors, optionsSelectors } from 'core';
import { ChooseCurrency } from 'molecules';
import { CurrencyCalculator, Window } from 'organisms';

export const App: React.FC = () => {
  const isPageTooltip = useSelector(optionsSelectors.getIsPageTooltip);
  const currency = useSelector(appSelectors.getCurrency);

  const handlePropagation = (event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation();

  if (!isPageTooltip) return null;

  return (
    <div onMouseDown={handlePropagation} onMouseUp={handlePropagation}>
      {!currency && <ChooseCurrency />}
      {currency && <Window content={<CurrencyCalculator />}></Window>}
    </div>
  );
};
