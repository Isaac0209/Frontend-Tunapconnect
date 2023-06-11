import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { Divider, Typography } from '@mui/material'

export const ListItemCard = styled(ListItem)(({ theme }) => ({
  margin: '0 0 15px 0',
  padding: 0,
  '&:last-child': {
    margin: 0,
  },
}))
export const TitleCard = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
  color: '#0E948B',
  fontWeight: 'bold',
  textTransform: 'uppercase',
}))
export const DividerCard = styled(Divider)(({ theme }) => ({
  margin: '10px 0',
}))
export const InfoCardName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginRight: 3,
  whiteSpace: 'nowrap',
}))
export const InfoCardText = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
}))

export const ButtonLeft = styled(Button)(({ theme }) => ({
  color: 'white',
  background: '#0E948B',
  borderRadius: 4,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  padding: '5px 16px',
  flex: 1,
  textTransform: 'none',
  '&:hover': {
    background: '#1ACABA',
  },
}))
export const ButtonCenter = styled(IconButton)(({ theme }) => ({
  color: 'white',
  background: '#0E948B',
  borderRadius: 0,
  padding: '5px 12px',
  '&:hover': {
    background: '#1ACABA',
  },
  '&:disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
  },
}))
export const ButtonRight = styled(Button)(({ theme }) => ({
  color: 'white',
  background: '#0E948B',
  borderRadius: 4,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  padding: '10px 20px',
  textTransform: 'none',
  '&:hover': {
    background: '#1ACABA',
  },
}))

export const ButtonSubmit = styled(Button)(({ theme }) => ({
  color: 'white',
  background: '#0E948B',
  borderRadius: 4,
  // borderTopRightRadius: 0,
  // borderBottomRightRadius: 0,
  // padding: '5px 16px',
  flex: 1,
  textTransform: 'none',
  '&:hover': {
    background: '#1ACABA',
  },
}))
