import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
// import IconButton from "@mui/material/IconButton";

export const MenuItemButton = styled(MenuItem)(({ theme }) => ({
  // color: 'white',
  // background: '#0E948B',
  borderRadius: 4,
  // borderTopRightRadius: 0,
  // borderBottomRightRadius: 0,
  // flex: 1,
  // textTransform: 'none',
  '&:hover': {
    background: '#1ACABA',
    color: 'white',
  },
}))
