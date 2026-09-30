import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SettingsIcon from '@mui/icons-material/Settings';

const OPTIONS_URL = chrome.runtime.getURL('options.html');

interface IProps {
  disablePortal?: boolean;
}

export const OptionsButton: React.FC<IProps> = ({ disablePortal }) => {
  const handleOpenOptions = () => window.open(OPTIONS_URL);

  const handlePropagation = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <Tooltip placement="top" slotProps={{ popper: { disablePortal } }} title="Настройки расширения">
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
