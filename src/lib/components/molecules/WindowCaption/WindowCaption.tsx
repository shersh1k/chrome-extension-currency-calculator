import React, { useEffect, useState } from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { changeReactContainerPosition } from 'reactContainer';
import { CloseButton, OptionsButton, PinnedButton } from 'atoms';

export const WindowCaption: React.FC = () => {
  const classes = useStyles();

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

  useEffect(() => {
    const handleEndMoveOnDocument = () => setIsMoving(false);

    const handleMoveOnDocument = (event: MouseEvent) => {
      if (!isMoving) return;
      const x = event.pageX - cursorPosition.x;
      const y = event.pageY - cursorPosition.y;
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
    <div className={classes.caption} onMouseDown={handleStartMove} onMouseUp={handleEndMove}>
      <OptionsButton />
      <PinnedButton />
      <CloseButton />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    caption: {
      display: 'flex',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottom: '1px solid grey',
      alignItems: 'center',
      justifyContent: 'space-between',
      overflow: 'hidden',
      cursor: 'move',
      backgroundColor: 'lightgray',
    },
  }),
);
