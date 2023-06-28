import * as React from 'react'

import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import SearchIcon from '@mui/icons-material/Search'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ButtonIcon, ButtonModalDialog, ButtonPaginate } from '../../styles'
import { api } from '@/lib/api'
import { useContext, useEffect, useState } from 'react'
import { CompanyContext } from '@/contexts/CompanyContext'
import { ClientResponseType } from '@/types/service-schedule'
import ClientsTable from './Components/Table'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

interface ModalSearchClienteProps {
  openMolal: boolean
  handleClose: () => void
  handleAddClient: (data: ClientResponseType) => void
  dataClient: ClientResponseType | null
}

type SearchFormProps = {
  search: string
}

type paginationProps = {
  actual: number
  total: number
}

export default function ModalSearchClient({
  openMolal,
  handleClose,
  handleAddClient,
  dataClient,
}: ModalSearchClienteProps) {
  const [clientList, setClientList] = useState<ClientResponseType[] | []>([])
  const [clientSelected, setClientSelected] =
    useState<ClientResponseType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState<paginationProps | null>(null)

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      search: '',
    },
  })

  const { companySelected } = useContext(CompanyContext)

  async function onSubmitSearch(data: SearchFormProps) {
    setIsLoading(true)
    setClientList([])

    try {
      const result = await api.get(
        `/client?company_id=${companySelected}&search=${data.search}&limit=10${
          pagination ? '&current_page=' + pagination.actual : ''
        }`,
      )

      setClientList(result.data.data)
      if (!pagination) {
        setPagination((prevState) => {
          return {
            actual: 1,
            total: result.data.total_pages,
          }
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleSelectedClient(client: ClientResponseType) {
    setClientSelected(client)
  }

  function handlePaginateNext() {
    setPagination((prevState) => {
      if (prevState) {
        if (prevState.actual < prevState.total) {
          return {
            ...prevState,
            actual: prevState.actual + 1,
          }
        } else {
          return prevState
        }
      }
      return prevState
    })
  }
  function handlePaginatePrevious() {
    setPagination((prevState) => {
      if (prevState) {
        if (prevState.actual > 1) {
          return {
            ...prevState,
            actual: prevState.actual - 1,
          }
        } else {
          return prevState
        }
      }
      return prevState
    })
  }

  function handleDoubleClickClient() {
    if (clientSelected) {
      handleAddClient(clientSelected)
      handleClose()
      setClientList([])
      setClientSelected(null)
      setValue('search', '')
    }
  }

  useEffect(() => {
    if (openMolal) {
      reset({
        search: '',
      })
      if (dataClient) {
        setClientList([dataClient])
      } else {
        setClientList([])
      }
    }
  }, [openMolal])

  // const DisableButtonNext = pagination
  //   ? pagination?.actual >= pagination?.total
  //   : false
  // const DisableButtonPrevious = pagination ? pagination?.actual <= 1 : false

  return (
    <div>
      <Dialog open={openMolal} onClose={handleClose}>
        <DialogTitle>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            {' '}
            <Typography variant="h6">Buscar por cliente</Typography>
            {/* {clientList.length > 0 && ( */}
            {/* )} */}
          </Stack>
        </DialogTitle>
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
                disabled={isLoading}
                onClick={() => setPagination(null)}
              >
                <SearchIcon />
              </ButtonIcon>
            </Stack>

            <ClientsTable
              data={clientList}
              handleSelectedClient={handleSelectedClient}
              isLoading={isLoading}
              handleDoubleClick={handleDoubleClickClient}
            />

            {clientList.length > 0 && (
              <Stack
                direction="row"
                justifyContent="center"
                gap={1}
                marginTop={2}
              >
                <ButtonPaginate
                  type="submit"
                  onClick={handlePaginatePrevious}
                  // disabled={DisableButtonPrevious}
                >
                  <ArrowBackIosNewIcon />
                </ButtonPaginate>
                <ButtonPaginate
                  type="submit"
                  onClick={handlePaginateNext}
                  // disabled={DisableButtonNext}
                >
                  <ArrowForwardIosIcon />
                </ButtonPaginate>
              </Stack>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <ButtonModalDialog
            onClick={() => {
              handleClose()
              setClientList([])
              setClientSelected(null)
            }}
          >
            Cancel
          </ButtonModalDialog>
          <ButtonModalDialog
            // disabled={clientSelected === null}
            onClick={() => {
              if (clientSelected) {
                handleAddClient(clientSelected)
                handleClose()
                setClientList([])
                setClientSelected(null)
                setValue('search', '')
              }
            }}
          >
            Selecionar
          </ButtonModalDialog>
        </DialogActions>
      </Dialog>
    </div>
  )
}
