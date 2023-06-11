import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MoreVertIcon from '@mui/icons-material/MoreVert'
// import Divider from "@mui/material/Divider";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import { Settings } from "@mui/icons-material";
import { MoreOptionsButtonSelectProps } from './types'
import { MenuItemButton } from './styles'

export function MoreOptionsButtonSelect({
  handleIsEditSelectedCard,
  typeEdit,
  buttons,
  disabledButton,
}: MoreOptionsButtonSelectProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleButtonEdit = () => {
    handleIsEditSelectedCard(typeEdit)
    setAnchorEl(null)
  }
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        disabled={disabledButton}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            p: '0 10px',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* {buttons && buttons.map(button => {
          return (
            <MenuItem onClick={handleClose} key={button.label + typeEdit}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Editar
            </MenuItem>
          )
        })} */}
        <MenuItemButton onClick={handleButtonEdit}>
          {/* <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon> */}
          Editar
        </MenuItemButton>
      </Menu>
    </div>
  )
}
