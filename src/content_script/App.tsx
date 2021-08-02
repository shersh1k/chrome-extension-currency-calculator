import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { appActions, appSelectors, optionsSelectors } from 'contentScriptCore';
import { ChooseCurrencyButtons } from 'molecules';
import { CurrencyCalculator, Window } from './components';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const isPageTooltip = useSelector(optionsSelectors.getIsPageTooltip);
  const currency = useSelector(appSelectors.getCurrency);

  const handlePropagation = (event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation();

  const favorites = useSelector(optionsSelectors.getFavorites);
  const api = useSelector(optionsSelectors.getApi);

  const handleChooseCurrency = (currency: string) => {
    dispatch(appActions.setCurrency({ currency }));
  };

  if (!isPageTooltip) return null;

  return (
    <div onMouseDown={handlePropagation} onMouseUp={handlePropagation}>
      {!currency && (
        <ChooseCurrencyButtons api={api} favorites={favorites} handleChooseCurrency={handleChooseCurrency} />
      )}
      {currency && <Window content={<CurrencyCalculator />}></Window>}
    </div>
  );
};
