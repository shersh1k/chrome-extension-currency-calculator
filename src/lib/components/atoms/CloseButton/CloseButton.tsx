import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';

interface IProps {
  handleClose: () => void;
}

export const CloseButton: React.FC<IProps> = ({ handleClose }) => {
  const handlePropagation = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <IconButton
      onMouseUp={handlePropagation}
      onMouseDown={handlePropagation}
      title="Закрыть калькулятор"
      size="small"
      onClick={handleClose}
      color="secondary"
    >
      <CancelIcon />
    </IconButton>
  );
};
