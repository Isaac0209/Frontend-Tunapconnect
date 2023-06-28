import { alpha, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

import TableCell, { tableCellClasses } from '@mui/material/TableCell'

import TableRow from '@mui/material/TableRow'

export const TableCellHeader = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1C4961',
    color: '#fff',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

export const TableRowSBody = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&: hover': {
    background: '#1ACABA',
    color: '#FFF',
    '& td': {
      color: '#FFF',
    },
  },
  '&.Mui-selected': {
    background: '#1ACABA',
    color: '#FFF',
    '& td': {
      color: '#FFF',
    },
    '&: hover': {
      background: alpha('#1ACABA', 0.5),
      color: '#FFF',
      '& td': {
        color: '#FFF',
      },
    },
  },
}))
export const TableRowSNoData = styled(TableRow)(({ theme }) => ({
  height: 100,
}))

export const ButtonModalNewClient = styled(Button)(({ theme }) => ({
  color: 'white',
  background: '#0E948B',
  borderRadius: 4,
  // borderTopLeftRadius: 0,
  // borderBottomLeftRadius: 0,
  padding: '5px 10px',
  textTransform: 'uppercase',
  '&:hover': {
    background: '#1ACABA',
  },
  '&:disabled': {
    background: '#e0f2f1',
  },
}))
