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
import { CompanyContext } from '@/contexts/CompanyContext'
import { Part } from 'formidable'
import { Kit, Service } from '@/types/budget'

interface ModalSearchKitProps {
  openMolal: boolean
  handleClose: () => void
  handleAddService: (data: Service | any) => void
  handleAddPart: (data: Part | any) => void
}

type SearchFormProps = {
  search: string
  quantidade: number
  desconto: number
}

export default function ModalSearchKit({
  openMolal,
  handleClose,
  handleAddService,
  handleAddPart,
}: ModalSearchKitProps) {
  const [partList, setPartList] = useState<Part[] | []>([])
  const [serviceList, setServiceList] = useState<Service[] | []>([])
  const [kitList, setKitList] = useState<Kit[] | []>([])

  const [adicionais, setAdicions] = useState({
    desconto: 0,
    quantidade: 0,
  })
  const [kitSelect, setKitSelect] = useState<Kit | null>(null)
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      search: '',
      quantidade: 0,
      desconto: 0,
    },
  })

  const api = new ApiCore()

  const { companySelected } = useContext(CompanyContext)
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string,
  ) => {
    var value = parseInt(event.target.value)
    setAdicions({
      ...adicionais,
      [name]: value,
    })
  }
  async function onSubmitSearch(data: SearchFormProps) {
    try {
      const result = await api.get(
        `https://tunapconnect-api.herokuapp.com/api/kit?search=${data.search}&company_id=${companySelected}`,
      )

      setKitList(result.data.data)
      console.log(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Dialog open={openMolal} onClose={handleClose}>
        <DialogTitle>Buscar por Kits</DialogTitle>
        <ListItem>
          <ListItemText>Quantidade:</ListItemText>
          <TextField
            onChange={(event) => handleChange(event, 'quantidade')}
            type="number"
          ></TextField>
        </ListItem>
        <ListItem>
          <ListItemText>Desconto:</ListItemText>
          <TextField
            onChange={(event) => handleChange(event, 'desconto')}
            type="number"
          ></TextField>
        </ListItem>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitSearch)}
            sx={{
              flexWrap: 'nowrap',
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <Stack flexDirection="row" sx={{ marginY: 2 }}>
              <TextField
                id="outlined-size-small"
                size="small"
                sx={{ flex: 1, width: '100%' }}
                {...register('search')}
              />

              <ButtonIcon
                type="submit"
                aria-label="search"
                color="primary"
                sx={{ marginLeft: 1 }}
              >
                <SearchIcon />
              </ButtonIcon>
            </Stack>
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 },
              }}
              // subheader={<li />}
            >
              <li>
                {kitList.map((item, index) => (
                  <ListItemButton
                    key={`${index}-${item}`}
                    onClick={() => {
                      console.log(item.products.length)

                      if (item.services?.length == 0) {
                        console.log('opa')
                      }
                      setKitSelect(item)
                    }}
                    selected={item.kit_id === kitSelect?.kit_id}
                    sx={{
                      '&.Mui-selected': {
                        background: '#1C4961',
                        color: '#fff',
                        '&:hover': {
                          background: '#1C4961',
                          color: '#fff',
                          opacity: 0.7,
                        },
                        '& span': {
                          color: '#fff',
                          '&:hover': {
                            color: '#fff',
                            opacity: 0.7,
                          },
                        },
                      },
                    }}
                  >
                    <ListItemText
                      primary={`${item.name}`}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {/* Preço: {item.sale_value} */}
                          </Typography>
                        </>
                      }
                    />
                  </ListItemButton>
                ))}
              </li>
            </List>
          </Box>
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <ButtonModalDialog
            onClick={() => {
              handleClose()
              setPartList([])
              setServiceList([])

              setKitSelect(null)
              setAdicions({
                desconto: 0,
                quantidade: 0,
              })
            }}
          >
            Cancel
          </ButtonModalDialog>
          <ButtonModalDialog
            // disabled={clientSelected === null}
            onClick={() => {
              if (kitSelect) {
                if (kitSelect?.services?.length != 0) {
                  for (let i = 0; i < kitSelect?.services?.length; i++) {
                    kitSelect.services[i].price_discount = adicionais.desconto
                    kitSelect.services[i].quantity = adicionais.quantidade
                    handleAddService(kitSelect?.services[i])
                  }
                }
                if (kitSelect?.products?.length != 0) {
                  for (let i = 0; i < kitSelect?.products?.length; i++) {
                    kitSelect.products[i].desconto = adicionais.desconto
                    kitSelect.products[i].quantidade = adicionais.quantidade

                    handleAddPart(kitSelect?.products[i])
                  }
                }
                handleClose()
                setPartList([])
                setServiceList([])
                setKitSelect(null)
                setAdicions({
                  desconto: 0,
                  quantidade: 0,
                })
              }
            }}
          >
            Adicionar
          </ButtonModalDialog>
        </DialogActions>
      </Dialog>
    </div>
  )
}
