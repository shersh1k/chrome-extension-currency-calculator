import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DatePicker as MuiDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { format, isToday } from 'date-fns';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';

import { appSelectors } from 'selectors';
import { appActions } from 'actions';

export const DatePicker: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const date = useSelector(appSelectors.getDate);

  const [isChangingDate, setIsChangingDate] = useState(false);

  const handleOpenChangeDate = () => setIsChangingDate((val) => !val);

  const handleChangeDate = (date: Date | null) => {
    dispatch(appActions.setDate({ date }));
    setIsChangingDate(false);
  };

  const handleClearDate = () => dispatch(appActions.setDate({ date: new Date() }));

  return (
    <div className={classes.date}>
      <span className={classes.changeDate} onClick={handleOpenChangeDate}>
        Курсы на {isToday(date) ? `сегодня (${format(date, 'dd.MM.yyyy')})` : format(date, 'dd.MM.yyyy')}
      </span>
      {!isToday(date) && (
        <IconButton title="Сегодня" size="small" onClick={handleClearDate} color="secondary">
          <CancelIcon />
        </IconButton>
      )}

      {isChangingDate && (
        <div className={classes.datePicker}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
            <MuiDatePicker disableToolbar disableFuture variant="static" value={date} onChange={handleChangeDate} />
          </MuiPickersUtilsProvider>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    date: {
      height: 30,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    },
    changeDate: {
      cursor: 'pointer',
    },
    datePicker: {
      border: '1px solid grey',
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
    },
  }),
);
