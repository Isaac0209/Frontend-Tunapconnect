import styled from '@emotion/styled'
import Paper from '@mui/material/Paper'

export const ContainerItem = styled(Paper)`
  &:hover {
    transform: scale(1.1);
    background-color: rgb(85, 107, 214, 0.1);
    cursor: pointer;
    transition: all 0.3s;
  }
`
