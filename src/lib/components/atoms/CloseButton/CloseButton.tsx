import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';

interface IProps {
  handleClose: () => void;
}

export const CloseButton: React.FC<IProps> = ({ handleClose }) => {
  const handlePropagation = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <Tooltip PopperProps={{ disablePortal: true }} placement="top" title="Закрыть">
      <IconButton
        color="secondary"
        size="small"
        onClick={handleClose}
        onMouseDown={handlePropagation}
        onMouseUp={handlePropagation}
      >
        <CloseIcon />
      </IconButton>
    </Tooltip>
  );
};
