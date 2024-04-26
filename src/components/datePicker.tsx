import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function DatePickerOpenTo() {
  const currentYear = dayjs().year();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          openTo="month"
          views={['month']}
          value={dayjs().set('year', currentYear)}
          onChange={(newValue) => {
            console.log(newValue);
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '.5rem',
              height: '2.5rem',
              '& .MuiOutlinedInput-input': {
                padding: '0.5rem',
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}