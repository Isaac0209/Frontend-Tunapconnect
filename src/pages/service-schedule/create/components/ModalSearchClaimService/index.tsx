/* eslint-disable no-unused-vars */
import * as React from 'react'

import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import SearchIcon from '@mui/icons-material/Search'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, List, ListItemButton, ListItemText, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ButtonIcon, ButtonModalDialog } from '../../styles'
import { ApiCore } from '@/lib/api'
import { useContext, useEffect, useState } from 'react'
import { CompanyContext } from '@/contexts/CompanyContext'
import { ClientResponseType } from '@/types/service-schedule'

interface ModalSearchClaimServiceProps {
  openMolal: boolean
  handleClose: () => void
  handleAddClaimService: (data: any) => void
}

type SearchFormProps = {
  search: string
}

export default function ModalSearchClaimService({
  openMolal,
  handleClose,
  handleAddClaimService,
}: ModalSearchClaimServiceProps) {
  const [ClaimServiceList, setClaimServiceList] = useState<any[] | []>([])
  const [ClaimServiceSelected, setClaimServiceSelected] = useState<any | null>(
    null,
  )

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      search: '',
    },
  })

  const api = new ApiCore()

  const { companySelected } = useContext(CompanyContext)

  async function onSubmitSearch(data: SearchFormProps) {
    console.log(data)
    try {
      const result = await api.get(
        `/claim-service=${companySelected}&search=${data.search}`,
      )
      console.log(result.data.data)
      setClaimServiceList(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   try {
  //     const result = await api.get(`/claim-service=${companySelected}`)
  //     console.log(result.data.data)
  //     setClaimServiceList(result.data.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [])

  return (
    <div>
      <Dialog open={openMolal} onClose={handleClose}>
        <DialogTitle>Buscar por ClaimServicee</DialogTitle>
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
            {/* <Stack flexDirection="row" sx={{ marginY: 2 }}>
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
            </Stack> */}
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
                {ClaimServiceList.map((item, index) => (
                  <ListItemButton
                    key={`${index}-${item}`}
                    onClick={() => setClaimServiceSelected(item)}
                    selected={item.id === ClaimServiceSelected?.id}
                    sx={{
                      '&.Mui-selected': {
                        background: '#1C4961',
                        color: '#fff',
                        '&:hover': {
                          background: '#1C4961',
                          color: '#fff',
                          opacity: 0.7,
                        },
                      },
                    }}
                  >
                    <ListItemText primary={`${item.name}`} />
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
              setClaimServiceList([])
              setClaimServiceSelected(null)
            }}
          >
            Cancel
          </ButtonModalDialog>
          <ButtonModalDialog
            // disabled={ClaimServiceSelected === null}
            onClick={() => {
              if (ClaimServiceSelected) {
                handleAddClaimService(ClaimServiceSelected)
                handleClose()
                setClaimServiceList([])
                setClaimServiceSelected(null)
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
