import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeList } from 'react-window';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';

import { Api } from 'API';
import { ApiTypes, IAbbreviation } from 'types';
import { API, FAVORITE } from 'consts';
import { optionsActions, optionsSelectors } from 'commonCore';
import { appSelectors } from 'optionsCore';

import { CurrencyRow } from './CurrencyRow';
import { FavoriteCurrencys } from './FavoriteCurrencys';

export const ApiTab = () => {
  const dispatch = useDispatch();

  const tab = useSelector(appSelectors.getTab);
  const api = useSelector(optionsSelectors.getApi);
  const favorites = useSelector(optionsSelectors.getFavorites);

  const [allAbbreviations, setAllAbbreviations] = useState<IAbbreviation[]>([]);
  const [showedAbbreviations, setShowedAbbreviations] = useState<IAbbreviation[]>([]);
  const [searchString, setSearchString] = useState('');

  const handleApiChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const newApi = event.target.value as ApiTypes;
    dispatch(optionsActions.setApi({ api: newApi }));
    dispatch(optionsActions.setFavorites({ favorites: FAVORITE }));
  };

  const handleClearSearch = () => setSearchString('');

  const handleChangeSearchString = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  useEffect(() => {
    if (!api) return;
    Api.getAbbreviations(api).then((res) => {
      setAllAbbreviations(res);
    });
  }, [api]);

  useEffect(() => {
    if (!searchString) return setShowedAbbreviations(allAbbreviations);
    const lowerCaseString = searchString.toLowerCase();

    const newShowedAbbr = allAbbreviations.filter((abbr) => {
      if (abbr.abbreviation.toLowerCase().indexOf(lowerCaseString) !== -1) return true;
      if (abbr.name.toLowerCase().indexOf(lowerCaseString) !== -1) return true;

      return false;
    });

    setShowedAbbreviations(newShowedAbbr);
  }, [allAbbreviations, searchString]);

  return (
    <Box hidden={tab !== 2} p={3}>
      <FormControl fullWidth>
        <InputLabel id="api-select-label">Предоставление курсов (API)</InputLabel>
        <Select labelId="api-select-label" value={api ?? API} onChange={handleApiChange}>
          <MenuItem value="BYN">Национальный банк Республики Беларусь</MenuItem>
          <MenuItem value="RUB">Центральный банк Российской Федерации</MenuItem>
        </Select>
      </FormControl>
      <div style={{ display: 'flex', marginTop: 50, justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <Typography component="span">Выберите валюты предоставляемые API:</Typography>
            <div style={{ width: 250 }}>
              <TextField placeholder="Найти валюту" value={searchString} onChange={handleChangeSearchString} />
              {searchString && (
                <IconButton color="secondary" size="small" onClick={handleClearSearch}>
                  <ClearIcon />
                </IconButton>
              )}
            </div>
          </div>
          <FixedSizeList height={600} itemCount={showedAbbreviations.length} itemSize={46} width={630}>
            {CurrencyRow({ items: showedAbbreviations, favorites })}
          </FixedSizeList>
        </div>
        {allAbbreviations.length > 0 && <FavoriteCurrencys allAbbreviations={allAbbreviations} />}
      </div>
    </Box>
  );
};
