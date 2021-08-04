import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';

const OPTIONS_URL = chrome.extension.getURL('options.html');

export const OptionsButton: React.FC = () => {
  const handleOpenOptions = () => window.open(OPTIONS_URL);

  const handlePropagation = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <IconButton
      color="primary"
      size="small"
      title="Настройки расширения"
      onClick={handleOpenOptions}
      onMouseDown={handlePropagation}
      onMouseUp={handlePropagation}
    >
      <SettingsIcon />
    </IconButton>
  );
};
