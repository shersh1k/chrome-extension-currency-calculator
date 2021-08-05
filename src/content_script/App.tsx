import React from 'react';

import { useSelector } from 'react-redux';

import { optionsSelectors } from 'commonCore';
import { CurrencyCalculator, Window } from './components';

export const App: React.FC = () => {
  const isPageTooltip = useSelector(optionsSelectors.getIsPageTooltip);
  const favorites = useSelector(optionsSelectors.getFavorites);
  const api = useSelector(optionsSelectors.getApi);

  if (!isPageTooltip || !api || !favorites) return null;

  return (
    <Window>
      <CurrencyCalculator />
    </Window>
  );
};
