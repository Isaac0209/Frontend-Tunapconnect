import * as React from 'react'

import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'

import DialogTitle from '@mui/material/DialogTitle'
import { List, ListItem, ListItemText } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ButtonModalDialog } from '../../../../styles'
import { useContext, useState } from 'react'
import { CompanyContext } from '@/contexts/CompanyContext'
import { Part } from 'formidable'
import { Kit, Service } from '@/types/budget'

interface ModalSelectValueProps {
  openMolal: boolean
  handleClose: () => void
  handleAddService: (data: Service | any) => void
  handleAddPart: (data: Part | any) => void
  value: Kit
}

type SearchFormProps = {
  search: string
  quantidade: number
  desconto: number
}

export default function ModalSelectedValue({
  openMolal,
  handleClose,
  handleAddService,
  handleAddPart,
  value,
}: ModalSelectValueProps) {
  const [kit, setKit] = useState<Kit | null>()
  React.useEffect(() => {
    setKit(value)
  })

  return (
    <div>
      <Dialog open={openMolal} onClose={handleClose}>
        <DialogTitle>Selecione os valores</DialogTitle>
        <List>
          {value?.products?.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Peça ${index + 1}`}
                secondary={
                  <>
                    <ListItemText>Quantidade:</ListItemText>
                    <TextField
                      onChange={(event) => {
                        item.product.quantity = parseInt(event.target.value)
                      }}
                      type="number"
                    />

                    <ListItemText>Desconto:</ListItemText>
                    <TextField
                      onChange={(event) => {
                        item.product.price_discount = parseInt(
                          event.target.value,
                        )
                      }}
                      type="number"
                    />
                  </>
                }
              />
            </ListItem>
          ))}
          {value?.services?.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`Serviço ${index + 1}`}
                secondary={
                  <>
                    <ListItemText>Quantidade:</ListItemText>
                    <TextField
                      onChange={(event) => {
                        item.service.quantity = parseInt(event.target.value)
                      }}
                      type="number"
                    />

                    <ListItemText>Desconto:</ListItemText>
                    <TextField
                      onChange={(event) => {
                        item.service.price_discount = parseInt(
                          event.target.value,
                        )
                      }}
                      type="number"
                    />
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <ButtonModalDialog
            onClick={() => {
              handleClose()
              setKit(null)
            }}
          >
            Cancel
          </ButtonModalDialog>
          <ButtonModalDialog
            // disabled={clientSelected === null}
            onClick={() => {
              console.log(kit?.products)

              if (kit?.products.length !== 0) {
                for (let i = 0; i < (kit?.products?.length || 0); i++) {
                  handleAddPart(kit?.products[i].product)
                }
              }
              if (kit?.services.length !== 0) {
                for (let i = 0; i < (kit?.services?.length || 0); i++) {
                  handleAddService(kit?.services[i].service)
                }
              }
              handleClose()
              setKit(null)
            }}
          >
            Adicionar
          </ButtonModalDialog>
        </DialogActions>
      </Dialog>
    </div>
  )
}
