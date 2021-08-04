import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

interface IProps {
  handleClose: () => void;
}

export const CloseButton: React.FC<IProps> = ({ handleClose }) => {
  const handlePropagation = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <IconButton
      color="secondary"
      size="small"
      title="Закрыть калькулятор"
      onClick={handleClose}
      onMouseDown={handlePropagation}
      onMouseUp={handlePropagation}
    >
      <CloseIcon />
    </IconButton>
  );
};
