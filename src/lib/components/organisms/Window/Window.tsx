import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { WindowCaption } from 'molecules';

interface IWindowProps {
  content?: React.ReactNode;
}

export const Window: React.FC<IWindowProps> = ({ content, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.window}>
      <WindowCaption />
      <div className={classes.content}>{content ?? children}</div>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    window: {
      border: '1px solid grey',
      background: 'white',
      borderRadius: 10,
    },
    content: {
      padding: 10,
    },
  }),
);
