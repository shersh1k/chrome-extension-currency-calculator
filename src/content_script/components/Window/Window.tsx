import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { CloseButton, OptionsButton, PinnedButton } from 'atoms';
import { appActions, appSelectors } from 'contentScriptCore';

import { changeReactContainerPosition } from '../../reactContainer';

interface IWindowProps {
  content?: React.ReactNode;
}

export const Window: React.FC<IWindowProps> = ({ content, children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isPinned = useSelector(appSelectors.getIsPinned);

  const [isMoving, setIsMoving] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleStartMove = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCursorPosition({ x, y });
    setIsMoving(true);
  };

  const handleEndMove = () => setIsMoving(false);
  const handleClose = () => dispatch(appActions.close());
  const handlePinned = () => dispatch(appActions.setIsPinned({ isPinned: !isPinned }));

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
      <div className={classes.caption} onMouseDown={handleStartMove} onMouseUp={handleEndMove}>
        <OptionsButton />
        <PinnedButton handlePinned={handlePinned} isPinned={isPinned} />
        <CloseButton handleClose={handleClose} />
      </div>
      <div className={classes.content}>{content ?? children}</div>
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
