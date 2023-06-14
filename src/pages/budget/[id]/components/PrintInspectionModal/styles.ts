import { DataGrid, gridClasses } from '@mui/x-data-grid'
// import Button from '@mui/material/Button'
import { alpha, styled } from '@mui/material/styles'
import { grey } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import { Box } from '@mui/material'

// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import useMediaQuery from '@mui/material/useMediaQuery';

const ODD_OPACITY = 0.2

// {
//   const style = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   }
// }

export const BoxContainer = styled(Box)(({ theme }) => ({
  '& .super-app-theme--header': {
    border: 'none',
    // backgroundColor: '#1c4961',
    // color: 'white',
    alignItems: 'flex-start',
    '& .MuiDataGrid-cell:focus': {
      outline: 0,
    },
  },
}))

export const TableDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  '& .MuiDataGrid-columnSeparator': {
    '& svg': {
      visibility: 'hidden',
    },
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 0,
  },
  '& .MuiDataGrid-columnHeaders': {
    // display: "none",
    // marginBottom: 40,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  '& .MuiDataGrid-virtualScroller': { marginTop: '0!important' },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),

        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}))

export const ButtonIcon = styled(IconButton)(({ theme }) => ({
  color: grey[600],
  background: grey[200],
  borderRadius: 3,
  '&:hover': {
    background: grey[400],
  },
}))
