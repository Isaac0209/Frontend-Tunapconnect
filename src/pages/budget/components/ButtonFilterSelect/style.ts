import { alpha, styled } from '@mui/material/styles'

import Button from '@mui/material/Button'

export const ButtonFilter = styled(Button)(({ theme }) => ({
  color: 'white',
  background: '#1C4961',
  borderRadius: 4,
  margin: 5,
  height: 41,
  '&:hover': {
    background: alpha('#1C4961', 0.7),
  },
}))
