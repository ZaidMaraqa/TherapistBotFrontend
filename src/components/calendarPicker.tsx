import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { styled } from "@mui/system";

const CustomDateCalendar = styled(DateCalendar)({
  "& .css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root.Mui-selected": {
    color: "#fff",
    backgroundColor: "#231E5B",
    fontWeight: 500,
  },
});

export default function DateCalendarValue() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2024-06-14"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateCalendar", "DateCalendar"]}>
        <CustomDateCalendar
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}