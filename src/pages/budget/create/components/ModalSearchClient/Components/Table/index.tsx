import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { ClientResponseType } from '@/types/service-schedule'
import { TableCellHeader, TableRowSBody, TableRowSNoData } from './style'
import { Stack } from '@mui/system'
import { useState } from 'react'
import { Box, CircularProgress } from '@mui/material'

interface ClientsTableProps {
  handleSelectedClient: (client: ClientResponseType) => void
  data: ClientResponseType[]
  isLoading: boolean
  handleDoubleClick: () => void
}

export default function ClientsTable({
  data,
  handleSelectedClient,
  isLoading,
  handleDoubleClick,
}: ClientsTableProps) {
  const [clientSelected, setClientSelected] = useState<number | null>(null)
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 350, maxHeight: 350 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCellHeader>Nome</TableCellHeader>
              <TableCellHeader>CPF:</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((row) => (
                <TableRowSBody
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                  onClick={(e) => {
                    if (e.detail === 2) {
                      handleDoubleClick()
                    }
                    handleSelectedClient(row)
                    setClientSelected(row.id)
                  }}
                  selected={clientSelected === row.id}
                >
                  <TableCell scope="row">{row.name}</TableCell>
                  <TableCell align="right">{row.document}</TableCell>
                </TableRowSBody>
              ))
            ) : (
              <TableRowSNoData>
                <TableCell scope="row" colSpan={2} align="center">
                  <Stack gap={1} alignItems="center" justifyContent="center">
                    {isLoading ? (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <>
                        <p>Nenhuma cliente encontrado</p>
                        {/* <ButtonModalNewClient
                          onClick={() => handleModalNewClient()}
                        >
                          adicionar novo
                        </ButtonModalNewClient> */}
                      </>
                    )}
                  </Stack>
                </TableCell>
              </TableRowSNoData>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
