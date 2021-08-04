import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { ChooseCurrencyButtons } from 'molecules';
import { optionsSelectors } from 'commonCore';
import { appActions, appSelectors } from 'contentScriptCore';
import { CurrencyCalculator, Window } from './components';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const isPageTooltip = useSelector(optionsSelectors.getIsPageTooltip);
  const currency = useSelector(appSelectors.getCurrency);

  const handlePropagation = (event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation();

  const favorites = useSelector(optionsSelectors.getFavorites);
  const api = useSelector(optionsSelectors.getApi);

  const handleChooseCurrency = (newCurrency: string) => {
    dispatch(appActions.setCurrency({ currency: newCurrency }));
  };

  if (!isPageTooltip || !api || !favorites) return null;

  return (
    <div onMouseDown={handlePropagation} onMouseUp={handlePropagation}>
      {!currency && (
        <ChooseCurrencyButtons api={api} favorites={favorites} handleChooseCurrency={handleChooseCurrency} />
      )}
      {currency && <Window content={<CurrencyCalculator />} />}
    </div>
  );
};
