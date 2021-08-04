import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import EjectIcon from '@material-ui/icons/Eject';

interface IProps {
  isPinned: boolean;
  handlePinned: () => void;
}

export const PinnedButton: React.FC<IProps> = ({ isPinned, handlePinned }) => {
  const handlePropagation = (event: React.MouseEvent) => event.stopPropagation();

  return (
    <IconButton
      color={isPinned ? 'primary' : undefined}
      size="small"
      title={isPinned ? 'Открепить' : 'Закрепить'}
      onClick={handlePinned}
      onMouseDown={handlePropagation}
      onMouseUp={handlePropagation}
    >
      <EjectIcon />
    </IconButton>
  );
};
