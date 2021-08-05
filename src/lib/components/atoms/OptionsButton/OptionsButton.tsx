import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import SettingsIcon from '@material-ui/icons/Settings';

const OPTIONS_URL = chrome.extension.getURL('options.html');

interface IProps {
  disablePortal?: boolean;
}

export const OptionsButton: React.FC<IProps> = ({ disablePortal }) => {
  const handleOpenOptions = () => window.open(OPTIONS_URL);

  const handlePropagation = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <Tooltip PopperProps={{ disablePortal }} placement="top" title="Настройки расширения">
      <IconButton
        color="primary"
        size="small"
        onClick={handleOpenOptions}
        onMouseDown={handlePropagation}
        onMouseUp={handlePropagation}
      >
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  );
};
