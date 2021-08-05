import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
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

  const handleFavoriteChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const abbreviationString = event.target.value;

    const newFavorites = checked
      ? [...favorites, abbreviationString]
      : favorites.filter((item) => item !== abbreviationString);

    dispatch(optionsActions.setFavorites({ favorites: newFavorites }));
  };

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
        <div style={{ flex: 1 }}>
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
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {showedAbbreviations.map((item) => (
              <Grid item key={item.id} xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(favorites.find((fav) => fav === item.abbreviation))}
                      color="primary"
                      size="small"
                      value={item.abbreviation}
                      onChange={handleFavoriteChange}
                    />
                  }
                  label={`${item.name} (${item.abbreviation})`}
                />
              </Grid>
            ))}
          </div>
        </div>
        {allAbbreviations.length > 0 && <FavoriteCurrencys allAbbreviations={allAbbreviations} />}
      </div>
    </Box>
  );
};
