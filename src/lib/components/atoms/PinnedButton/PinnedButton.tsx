import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EjectIcon from '@material-ui/icons/Eject';

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
