import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { CloseButton, OptionsButton, PinnedButton } from 'atoms';
import { appActions, appSelectors } from 'contentScriptCore';

import { changeReactContainerPosition } from '../../reactContainer';

export const Window: React.FC = ({ children }) => {
  const { caption, content } = useStyles();
  const dispatch = useDispatch();

  const isPinned = useSelector(appSelectors.getIsPinned);

  const [isMoving, setIsMoving] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleClose = () => dispatch(appActions.close());

  const handlePinned = () => dispatch(appActions.setIsPinned({ isPinned: !isPinned }));

  const handleStartMove = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCursorPosition({ x, y });
    setIsMoving(true);
  };

  const handleEndMove = () => setIsMoving(false);

  useEffect(() => {
    const handleEndMoveOnDocument = () => setIsMoving(false);

    const handleMoveOnDocument = (event: MouseEvent) => {
      if (!isMoving) return;
      const x = event.clientX - cursorPosition.x;
      const y = event.clientY - cursorPosition.y;
      changeReactContainerPosition({ x, y });
    };

    document.addEventListener('mouseup', handleEndMoveOnDocument);
    document.addEventListener('mousemove', handleMoveOnDocument);

    return () => {
      document.removeEventListener('mouseup', handleEndMoveOnDocument);
      document.removeEventListener('mousemove', handleMoveOnDocument);
    };
  }, [isMoving, cursorPosition]);

  return (
    <>
      <div className={caption} onMouseDown={handleStartMove} onMouseUp={handleEndMove}>
        <OptionsButton disablePortal />
        <PinnedButton handlePinned={handlePinned} isPinned={isPinned} />
        <CloseButton handleClose={handleClose} />
      </div>
      <div className={content}>{children}</div>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    caption: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.palette.divider}`,
      cursor: 'move',
    },
    content: {
      padding: 10,
    },
  }),
);
