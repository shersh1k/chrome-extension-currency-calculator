import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import ClearIcon from '@mui/icons-material/Clear';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { IAbbreviation } from 'types';
import { optionsActions, optionsSelectors } from 'commonCore';

interface IProps {
  allAbbreviations: IAbbreviation[];
}

export const FavoriteCurrencys: React.FC<IProps> = ({ allAbbreviations }) => {
  const dispatch = useDispatch();

  const favorites = useSelector(optionsSelectors.getFavorites);
  const [favExt, setFavExt] = useState<IAbbreviation[]>([]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    const newFavorites = reorder(favExt, source.index, destination.index);
    setFavExt(newFavorites);
    dispatch(optionsActions.setFavorites({ favorites: newFavorites.map((favExtend) => favExtend.abbreviation) }));
  };

  const handleDelete = (favorite: IAbbreviation) => {
    const newFavorites = favExt.filter((fav) => fav !== favorite);
    setFavExt(newFavorites);
    dispatch(optionsActions.setFavorites({ favorites: newFavorites.map((favExtend) => favExtend.abbreviation) }));
  };

  useEffect(() => {
    const favExtend = favorites
      .map((fav) => allAbbreviations.find((abbr) => abbr.abbreviation === fav))
      .filter((fav) => fav !== undefined) as IAbbreviation[];
    setFavExt(favExtend);
  }, [dispatch, favorites, allAbbreviations]);

  return (
    <div>
      <Typography align="center">Порядок показа валют:</Typography>
      <Box sx={{ width: 320, height: 600, overflowY: 'auto' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(dropProvided) => (
              <Box
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
                sx={{ borderRadius: '4px', padding: '4px', marginTop: '5px', transition: 'all 0.5s' }}
              >
                {favExt.map((favorite, index) => (
                  <Draggable draggableId={String(favorite.id)} index={index} key={favorite.id}>
                    {(dragProvided, dragSnapshot) => (
                      <Box
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        sx={{
                          userSelect: 'none',
                          padding: '8px',
                          marginBottom: '4px',
                          width: 300,
                          display: 'flex',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          transition: 'background 0.5s',
                          border: 2,
                          borderColor: 'divider',
                          ...(dragSnapshot.isDragging && { bgcolor: 'primary.main' }),
                        }}
                      >
                        {favorite.name}({favorite.abbreviation})
                        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton color="secondary" size="small" onClick={() => handleDelete(favorite)}>
                            <ClearIcon />
                          </IconButton>
                          <DragIndicatorIcon />
                        </Box>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {dropProvided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </div>
  );
};

const reorder = (list: IAbbreviation[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
