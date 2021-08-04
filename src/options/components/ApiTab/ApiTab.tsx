import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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

  const handleApiChange = async (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const newApi = event.target.value as ApiTypes;
    dispatch(optionsActions.setApi({ api: newApi }));
    dispatch(optionsActions.setFavorites({ favorites: FAVORITE }));
    const newAbbr = await Api.getAbbreviations(newApi);
    setAllAbbreviations(newAbbr);
  };

  const handleFavoriteChange = (value: string) => {
    const newFavorites = favorites.find((item) => item === value)
      ? favorites.filter((item) => item !== value)
      : [...favorites, value];
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

    const newShowedAbbr = allAbbreviations.filter((abbr) => {
      if (abbr.abbreviation.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) return true;
      if (abbr.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) return true;

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
      <div style={{ display: 'flex', marginTop: 50, justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <Typography component="span">Выберите валюты предоставляемые API:</Typography>
            <TextField placeholder="Найти валюту" value={searchString} onChange={handleChangeSearchString} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {showedAbbreviations.map((item) => (
              <Grid key={item.id} xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(favorites.find((checked) => checked === item.abbreviation))}
                      color="primary"
                      size="small"
                    />
                  }
                  label={`${item.name} (${item.abbreviation})`}
                  value={item}
                  onChange={() => handleFavoriteChange(item.abbreviation)}
                />
              </Grid>
            ))}
          </div>
        </div>
        <FavoriteCurrencys />
      </div>
    </Box>
  );
};
