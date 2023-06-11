import { alpha, styled } from '@mui/material/styles'

import Button from '@mui/material/Button'

export const ButtonFilter = styled(Button)(({ theme }) => ({
  color: 'white',
  background: '#1ACABA',
  width: 113,
  marginLeft: 37,
  height: 58,
  '&:hover': {
    background: alpha('#1C4961', 0.7),
  },
}))
