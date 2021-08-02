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
