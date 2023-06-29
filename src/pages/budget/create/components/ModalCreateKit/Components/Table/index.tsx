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
import { Kit } from '@/types/budget'

interface KitTableProps {
  handleSelectedKit: (client: Kit) => void
  data: Kit[]
  isLoading: boolean
  handleDoubleClick: () => void
}

export default function ServiceTable({
  data,
  handleSelectedKit,
  isLoading,
  handleDoubleClick,
}: KitTableProps) {
  const [kitSelected, setKitSelect] = useState<number | null>(null)

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
              <TableCellHeader>Id:</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((row) => (
                <TableRowSBody
                  key={row.name}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                  onClick={(e) => {
                    if (e.detail === 2) {
                      handleDoubleClick()
                    }
                    handleSelectedKit(row)
                    setKitSelect(row.kit_id)
                  }}
                  selected={kitSelected === row.kit_id}
                >
                  <TableCell scope="row">{row.name}</TableCell>
                  <TableCell align="right">{row.kit_id}</TableCell>
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
                        <p>Nenhum Kit encontrado</p>
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
