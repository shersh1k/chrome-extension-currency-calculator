import React, { useEffect, useState } from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import { ApiTypes, IAbbreviation, NamingTypes } from 'types';
import { IS_PAGE_TOOLTIP, API, FAVORITE, NAMING } from 'consts';
import { Api } from 'API';
import { getOptionsFromStorage, setOptionsToStorage } from 'storage';

export const Options = () => {
  const [isPageTooltip, setIsPageTooltip] = useState<boolean>(IS_PAGE_TOOLTIP);
  const [api, setApi] = useState<ApiTypes>(API);
  const [favorites, setFavorites] = useState<string[]>(FAVORITE);
  const [naming, setNaming] = useState<NamingTypes>(NAMING);
  const [allAbbreviations, setAllAbbreviations] = useState<IAbbreviation[]>([]);
  const [saveStatus, setSaveStatus] = useState(false);

  useEffect(() => {
    getOptionsFromStorage((options) => {
      setIsPageTooltip(options.isPageTooltip);
      setApi(options.api);
      setFavorites(options.favorites);
      setNaming(options.naming);
    });
  }, []);

  useEffect(() => {
    Api.getAbbreviations(api).then((res) => {
      setAllAbbreviations(res);
    });
  }, [api]);

  const handleApiChange = async (event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const newApi = event.target.value as ApiTypes;
    setApi(newApi);
    setFavorites(FAVORITE);
    const newAbbr = await Api.getAbbreviations(newApi);
    setAllAbbreviations(newAbbr);
  };

  const handleFavoriteChange = (value: string) => {
    setFavorites((old) => {
      if (old.find((item) => item === value)) return old.filter((item) => item !== value);
      return [...old, value];
    });
  };

  const handleNamingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNaming(event.target.value as NamingTypes);
  };

  const saveOptions = () => {
    setOptionsToStorage({ api, favorites, naming, isPageTooltip }, () => {
      setSaveStatus(true);
      const id = setTimeout(() => {
        setSaveStatus(false);
      }, 1000);
      return () => clearTimeout(id);
    });
  };

  const defaultOptions = () => {
    setApi(API);
    setFavorites(FAVORITE);
    setNaming(NAMING);
    setIsPageTooltip(IS_PAGE_TOOLTIP);
  };

  return (
    <div
      style={{
        width: 640,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid grey',
      }}
    >
      <main
        style={{
          padding: 20,
          maxHeight: 450,
          overflow: 'auto',
        }}
      >
        <FormControl>
          <FormGroup style={{ marginTop: 10 }}>
            <FormControlLabel
              value={isPageTooltip}
              control={<Checkbox size="small" color="primary" checked={isPageTooltip} />}
              label="Отображать при выделение цифр на странице"
              onChange={() => setIsPageTooltip(!isPageTooltip)}
            />
          </FormGroup>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: 25 }}>
          <InputLabel id="api-select-label">Предоставление курсов (API)</InputLabel>
          <Select value={api} onChange={handleApiChange} labelId="api-select-label">
            <MenuItem value="BYN">Национальный банк Республики Беларусь</MenuItem>
            <MenuItem value="RUB">Центральный банк Российской Федерации</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginTop: 25 }}>
          <FormLabel>Как отображать названия валюты</FormLabel>
          <RadioGroup value={naming} onChange={handleNamingChange}>
            <FormControlLabel value="SHORT" control={<Radio />} label="USD" />
            <FormControlLabel value="LONG" control={<Radio />} label="Доллар США" />
            <FormControlLabel value="LONG (SHORT)" control={<Radio />} label="Доллар США (USD)" />
            <FormControlLabel value="SHORT (LONG)" control={<Radio />} label="USD (Доллар США)" />
          </RadioGroup>
        </FormControl>
        <FormControl style={{ marginTop: 25 }}>
          <FormLabel>Используемые валюты</FormLabel>
          <FormGroup style={{ marginTop: 10 }}>
            {allAbbreviations.map((item) => (
              <FormControlLabel
                key={item.id}
                value={item}
                control={
                  <Checkbox
                    size="small"
                    color="primary"
                    checked={Boolean(favorites.find((checked) => checked === item.abbreviation))}
                  />
                }
                label={`${item.name} (${item.abbreviation})`}
                onChange={() => handleFavoriteChange(item.abbreviation)}
              />
            ))}
          </FormGroup>
        </FormControl>
      </main>
      <footer
        style={{
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid grey',
        }}
      >
        <button onClick={saveOptions}>
          {saveStatus ? <span style={{ color: 'green' }}>Сохранено!</span> : <span>Сохранить</span>}
        </button>
        <button style={{ marginLeft: 15 }} onClick={defaultOptions}>
          Сбросить настройки
        </button>
      </footer>
    </div>
  );
};
