import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface AlertDialogProps {
  isOpen: {
    isOpen: boolean
    newTab: null | number
  }
  handleClose: () => void
  handleOpenAlertDialogIsSave: (value: boolean, newTab: null | number) => void
}

export function AlertDialog({
  isOpen,
  handleClose,
  handleOpenAlertDialogIsSave,
}: AlertDialogProps) {
  return (
    <div>
      <Dialog
        open={isOpen.isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Deseja continuar ?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Salve antes de ir para o próximo, ou deseja descartar as alterações.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleOpenAlertDialogIsSave(false, isOpen.newTab)
              handleClose()
            }}
          >
            descartar
          </Button>
          <Button
            onClick={() => {
              handleOpenAlertDialogIsSave(true, isOpen.newTab)
              handleClose()
            }}
            autoFocus
          >
            salvar
          </Button>
          <Button onClick={handleClose} autoFocus>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
