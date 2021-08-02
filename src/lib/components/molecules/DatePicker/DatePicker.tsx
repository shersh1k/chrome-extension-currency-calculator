import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DatePicker as MuiDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { format, isToday } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import DateFnsUtils from '@date-io/date-fns';
import { Button } from '@material-ui/core';

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
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
        <MuiDatePicker
          PopoverProps={{ container }}
          autoOk
          variant="inline"
          disableFuture
          format="Курс на dd.MM.yyyy"
          value={date}
          onChange={onChange}
        />
      </MuiPickersUtilsProvider>
      {!isToday(date) && (
        <Button size="small" title={format(new Date(), 'dd.MM.yyyy')} color="primary" onClick={clearDate}>
          Сегодня
        </Button>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    datePicker: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);
