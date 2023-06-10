import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";

type DateTimeInputProps = {
  dateSchedule: Dayjs | null;
  handleDateSchedule: (date: Dayjs | null) => void;
  disabled: boolean;
};

export function DateInput({
  dateSchedule,
  handleDateSchedule,
  disabled,
}: DateTimeInputProps) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <Box>
          <DatePicker
            disabled={disabled}
            value={dateSchedule ?? dayjs(new Date())}
            onChange={(newValue) => {
              handleDateSchedule(newValue);
            }}
            slotProps={{ textField: { size: "small" } }}
          />
        </Box>
      </LocalizationProvider>
    </>
  );
}
