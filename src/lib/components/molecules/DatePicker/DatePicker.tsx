import React from 'react';

import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker as MuiDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { format, isToday } from 'date-fns';

interface IProps {
  date: Date;
  onChange: (date: Date | null) => void;
  clearDate: () => void;
  container?: Element | (() => Element | null) | null | undefined;
}

export const DatePicker: React.FC<IProps> = ({ date, onChange, clearDate, container }) => {
  const classes = useStyles();

  return (
    <div className={classes.datePicker}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MuiDatePicker
          disableFuture
          slotProps={{ popper: { container } }}
          className={classes.muiDatePicker}
          format="Курс на dd.MM.yyyy"
          value={date}
          onChange={onChange}
        />
      </LocalizationProvider>
      {!isToday(date) && (
        <Tooltip PopperProps={{ disablePortal: true }} placement="top" title={format(new Date(), 'dd.MM.yyyy')}>
          <Button className={classes.muiButton} color="primary" size="small" onClick={clearDate}>
            Сегодня
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

const useStyles = makeStyles(() => ({
  datePicker: {
    display: 'flex',
    alignItems: 'center',
  },
  muiDatePicker: {
    width: 150,
  },
  muiButton: {
    marginLeft: 20,
  },
}));
