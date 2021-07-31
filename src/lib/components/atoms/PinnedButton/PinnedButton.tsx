import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import EjectIcon from '@material-ui/icons/Eject';

import { appSelectors } from 'selectors';
import { appActions } from 'actions';

export const PinnedButton: React.FC = () => {
  const dispatch = useDispatch();

  const isPinned = useSelector(appSelectors.getIsPinned);

  const handlePinned = () => dispatch(appActions.setIsPinned({ isPinned: !isPinned }));

  const handlePropagation = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <IconButton
      onMouseUp={handlePropagation}
      onMouseDown={handlePropagation}
      title={isPinned ? 'Открепить' : 'Закрепить'}
      size="small"
      onClick={handlePinned}
      color={isPinned ? 'primary' : undefined}
    >
      <EjectIcon />
    </IconButton>
  );
};
