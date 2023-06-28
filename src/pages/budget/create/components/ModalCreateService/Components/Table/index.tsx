import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TableCellHeader, TableRowSBody, TableRowSNoData } from './style'
import { Stack } from '@mui/system'
import { useState } from 'react'
import { Box, CircularProgress, TextField } from '@mui/material'
import { Service } from '@/types/budget'

interface ServicesTableProps {
  handleSelectedService: (client: Service) => void
  data: Service[]
  isLoading: boolean
  handleDoubleClick: () => void
}

export default function ServiceTable({
  data,
  handleSelectedService,
  isLoading,
  handleDoubleClick,
}: ServicesTableProps) {
  const [serviceSelected, setServiceSelect] = useState<number | null>(null)

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
              <TableCellHeader>Preço:</TableCellHeader>
              <TableCellHeader>Desconto:</TableCellHeader>
              <TableCellHeader>Quantidade:</TableCellHeader>
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
                    handleSelectedService(row)
                    setServiceSelect(row.id)
                  }}
                  selected={serviceSelected === row.id}
                >
                  <TableCell scope="row">{row.description}</TableCell>
                  <TableCell align="right">{row.standard_value}</TableCell>
                  <TableCell>
                    <TextField
                      onChange={(env) => {
                        row.price_discount = parseInt(env.target.value)
                      }}
                    >
                      {row.price_discount}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      onChange={(env) => {
                        row.quantity = parseInt(env.target.value)
                      }}
                    >
                      {row.quantity}
                    </TextField>
                  </TableCell>
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
                        <p>Nenhum Serviço encontrado</p>
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
