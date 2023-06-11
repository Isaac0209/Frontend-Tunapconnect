import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { Box } from '@mui/material'

type DateTimeInputProps = {
  dateSchedule: Dayjs | null
  handleDateSchedule: (date: Dayjs | null) => void
}

export function DataTimeInput({
  dateSchedule,
  handleDateSchedule,
}: DateTimeInputProps) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <Box>
          <DateTimePicker
            value={dateSchedule ?? dayjs(new Date())}
            onChange={(newValue) => {
              handleDateSchedule(newValue)
            }}
            slotProps={{ textField: { size: 'small' } }}
          />
        </Box>
      </LocalizationProvider>
    </>
  )
}
