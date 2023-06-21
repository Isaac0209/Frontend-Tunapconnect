import * as React from 'react'

import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import SearchIcon from '@mui/icons-material/Search'
import DialogTitle from '@mui/material/DialogTitle'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { ButtonIcon, ButtonModalDialog } from '../../styles'
import { ApiCore } from '@/lib/api'
import { useContext, useState } from 'react'

import { Kit } from '@/types/budget'

interface ModalCreateKitProps {
  openMolal: boolean
  handleClose: () => void
  handleAddKit: (data: Kit) => void
}



export default function ModalCreateService({
  openMolal,
  handleClose,
  handleAddKit,
}: ModalCreateKitProps) {


  interface FormValues {
    tipo: string;
    descricao: string;
    qtd: string;
    desconto: string;
    valor: string;
    total: string;

  }
  const [valores, setValores] = useState({
    tipo: 'Kit',
    descricao: '',
    qtd: '',
    desconto: '',
    valor: '',
    total: ''
  });
  async function onSubmitSearch(data: FormValues) {
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
    setValores({
      ...valores,
      [name]: event.target.value
    })
  };

  return (
    <div>
      <Dialog open={openMolal} onClose={handleClose}>
        <DialogTitle>Criar um novo kit</DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <ListItemText>Descrição:</ListItemText>
              <TextField value={valores?.descricao} onChange={(event) => handleChange(event, "descricao")}></TextField>
            </ListItem>
            <ListItem>
              <ListItemText>Quantidade:</ListItemText>
              <TextField value={valores?.qtd} onChange={(event) => handleChange(event, "qtd")} type='number'></TextField>
            </ListItem>
            <ListItem>
              <ListItemText>Desconto:</ListItemText>
              <TextField value={valores?.desconto} onChange={(event) => handleChange(event, "desconto")} type='number'></TextField>
            </ListItem>
            <ListItem>
              <ListItemText>Valor Unitário:</ListItemText>
              <TextField value={valores?.valor} onChange={(event) => handleChange(event, "valor")} type='number'></TextField>
            </ListItem>
            <ListItem>
              <ListItemText>Total:</ListItemText>
              <TextField value={valores?.total} onChange={(event) => handleChange(event, "total")} type='number'></TextField>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <ButtonModalDialog
            onClick={() => {
              handleClose()
            }}
          >
            Cancel
          </ButtonModalDialog>
          <ButtonModalDialog
            // disabled={clientSelected === null}
            onClick={() => {
                onSubmitSearch(valores)
                handleAddKit(valores)
                handleClose()
                
              
            }}
          >
            Adicionar
          </ButtonModalDialog>
        </DialogActions>
      </Dialog>
    </div>
  )
}
