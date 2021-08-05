import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker as MuiDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
// eslint-disable-next-line import/no-duplicates
import format from 'date-fns/format';
// eslint-disable-next-line import/no-duplicates
import isToday from 'date-fns/isToday';
// eslint-disable-next-line import/no-duplicates
import ruLocale from 'date-fns/locale/ru';

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
        <Tooltip PopperProps={{ disablePortal: true }} placement="top" title={format(new Date(), 'dd.MM.yyyy')}>
          <Button className={classes.muiButton} color="primary" size="small" onClick={clearDate}>
            Сегодня
          </Button>
        </Tooltip>
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
