import { alpha, styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

export const ButtonIcon = styled(IconButton)(({ theme }) => ({
  color: 'white',
  background: '#1C4961',
  borderRadius: 4,
  '&:hover': {
    background: alpha('#1C4961', 0.7),
  },
}))

export const ButtonAdd = styled(Button)(({ theme }) => ({
  color: 'white',
  background: '#1C4961',
  borderRadius: 4,
  '&:hover': {
    background: alpha('#1C4961', 0.7),
  },
}))
