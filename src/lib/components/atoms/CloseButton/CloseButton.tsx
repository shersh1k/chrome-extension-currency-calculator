import React from 'react';

import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';

import { appActions } from 'actions';

export const CloseButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleClose = () => dispatch(appActions.close());

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
