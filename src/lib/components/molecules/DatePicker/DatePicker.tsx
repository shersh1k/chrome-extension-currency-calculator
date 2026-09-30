import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { PortalProps } from '@mui/material/Portal';
import Tooltip from '@mui/material/Tooltip';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, isToday, isValid } from 'date-fns';
import { ru } from 'date-fns/locale/ru';

interface IProps {
  date: Date;
  onChange: (date: Date | null) => void;
  clearDate: () => void;
  container?: PortalProps['container'];
}

export const DatePicker: React.FC<IProps> = ({ date, onChange, clearDate, container }) => {
  // field allows typing, so skip incomplete/invalid dates
  const handleChange = (newDate: Date | null) => {
    if (newDate && isValid(newDate)) onChange(newDate);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <LocalizationProvider adapterLocale={ru} dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          closeOnSelect
          disableFuture
          format="'Курс на' dd.MM.yyyy"
          slotProps={{
            popper: { container },
            textField: { variant: 'standard', sx: { width: 210 } },
          }}
          value={date}
          onChange={handleChange}
        />
      </LocalizationProvider>
      {!isToday(date) && (
        <Tooltip
          placement="top"
          slotProps={{ popper: { disablePortal: true } }}
          title={format(new Date(), 'dd.MM.yyyy')}
        >
          <Button color="primary" size="small" sx={{ marginLeft: '20px' }} onClick={clearDate}>
            Сегодня
          </Button>
        </Tooltip>
      )}
    </Box>
  );
};
