import React from 'react';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EjectIcon from '@mui/icons-material/Eject';

interface IProps {
  isPinned: boolean;
  handlePinned: () => void;
}

export const PinnedButton: React.FC<IProps> = ({ isPinned, handlePinned }) => {
  const handlePropagation = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <Tooltip PopperProps={{ disablePortal: true }} placement="top" title={isPinned ? 'Открепить' : 'Закрепить'}>
      <IconButton
        color={isPinned ? 'primary' : undefined}
        size="small"
        onClick={handlePinned}
        onMouseDown={handlePropagation}
        onMouseUp={handlePropagation}
      >
        <EjectIcon />
      </IconButton>
    </Tooltip>
  );
};
