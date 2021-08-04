import React from 'react';

import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import clsx from 'clsx';

import { optionsActions, optionsSelectors } from 'commonCore';

export const FavoriteCurrencys: React.FC = () => {
  const dispatch = useDispatch();
  const { list, draggableList, item, itemSpan, draggableItem } = useStyles();

  const favorites = useSelector(optionsSelectors.getFavorites);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const items = reorder(favorites, source.index, destination.index);

    dispatch(optionsActions.setFavorites({ favorites: items }));
  };

  const handleDelete = (favorite: string) => {
    const newFavorites = favorites.filter((fav) => fav !== favorite);
    dispatch(optionsActions.setFavorites({ favorites: newFavorites }));
  };

  if (favorites === null) return null;

  return (
    <div>
      <Typography align="center">Порядок показа валют:</Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(dropProvided, dropSnapshot) => (
            <div className={clsx(list, dropSnapshot.isDraggingOver && draggableList)} ref={dropProvided.innerRef}>
              {favorites.map((favorite, index) => (
                <Draggable draggableId={String(favorite)} index={index} key={favorite}>
                  {(dragProvided, dragSnapshot) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      className={clsx(item, dragSnapshot.isDragging && draggableItem)}
                    >
                      {index + 1}. {favorite}
                      <span className={itemSpan}>
                        <IconButton color="secondary" size="small" onClick={() => handleDelete(favorite)}>
                          <ClearIcon />
                        </IconButton>
                        <DragIndicatorIcon />
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
              {dropProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      minHeight: 300,
      borderRadius: 4,
      padding: 4,
      marginTop: 5,
      border: `2px solid ${theme.palette.divider}`,
      transition: 'all 0.5s',
    },
    draggableList: {
      border: `2px solid ${theme.palette.primary.main}`,
    },

    item: {
      userSelect: 'none',
      padding: 4 * 2,
      marginBottom: 4,
      width: 300,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      border: `2px solid ${theme.palette.divider}`,
      transition: 'background 0.5s',
    },
    draggableItem: {
      border: `2px solid ${theme.palette.divider}`,
      background: theme.palette.primary.main,
    },
    itemSpan: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);
