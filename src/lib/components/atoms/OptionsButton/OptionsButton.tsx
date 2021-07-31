import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

const OPTIONS_URL = chrome.extension.getURL('options.html');

export const OptionsButton: React.FC = () => {
  const handleOpenOptions = () => window.open(OPTIONS_URL);

  const handlePropagation = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <IconButton
      onMouseUp={handlePropagation}
      onMouseDown={handlePropagation}
      title="Настройки расширения"
      size="small"
      color="primary"
      onClick={handleOpenOptions}
    >
      <SettingsApplicationsIcon />
    </IconButton>
  );
};
