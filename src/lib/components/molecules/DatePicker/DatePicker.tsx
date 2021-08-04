import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker as MuiDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ruLocale, { format, isToday } from 'date-fns';

interface IProps {
  date: Date;
  onChange: (date: Date | null) => void;
  clearDate: () => void;
  container?: React.ReactInstance | (() => React.ReactInstance | null) | null | undefined;
}

export const DatePicker: React.FC<IProps> = ({ date, onChange, clearDate, container }) => {
  const classes = useStyles();

  return (
    <div className={classes.datePicker}>
      <MuiPickersUtilsProvider locale={ruLocale} utils={DateFnsUtils}>
        <MuiDatePicker
          autoOk
          disableFuture
          PopoverProps={{ container }}
          className={classes.muiDatePicker}
          format="Курс на dd.MM.yyyy"
          value={date}
          variant="inline"
          onChange={onChange}
        />
      </MuiPickersUtilsProvider>
      {!isToday(date) && (
        <Button
          className={classes.muiButton}
          color="primary"
          size="small"
          title={format(new Date(), 'dd.MM.yyyy')}
          onClick={clearDate}
        >
          Сегодня
        </Button>
      )}
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
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
  }),
);
