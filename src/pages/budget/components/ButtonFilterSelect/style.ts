import { alpha, styled } from '@mui/material/styles'

import Button from '@mui/material/Button'

export const ButtonFilter = styled(Button)(({ theme }) => ({
  color: 'white',
  background: '#1c4961',
  width: 113,
  marginLeft: 5,
  height: 40,
  '&:hover': {
    background: alpha('#1c4961', 0.7),
  },
}))
