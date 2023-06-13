import * as React from 'react'
import style from './style.module.css'
import SearchIcon from '@mui/icons-material/Search'
import Button from '@mui/material/Button'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ButtonFilterSelect from './components/ButtonFilterSelect'
import DeleteIcon from '@mui/icons-material/Delete'
import { ApiCore } from '@/lib/api'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { CustomNoRowsOverlay } from '../../components/TableApp/NoRows'
import Box from '@mui/material/Box'

export default function BudgetList() {
  interface BudgetItem {
    id: number
    client: {
      name: string
    }
    client_vehicle: {
      plate: string
      chasis: string
    }
    technical_consultant: {
      name: string
    }
    TotalGeralDesconto: number
    TotalGeral: number
    total: number
  }

  const [infoBudget, setBudget] = React.useState<BudgetItem[] | undefined>()
  const [value, setValue] = React.useState('')
  const [tem, setTem] = React.useState<Boolean>()
  const [open, setOpen] = React.useState(false)

  const api = new ApiCore()
  const url = 'https://tunapconnect-api.herokuapp.com/api'
  type filterValuesProps = {
    date: {
      dateStart: string | null
      dateEnd: string | null
    }
  }

  const handleCloseSnackbar = () => {
    setOpen(false)
  }

  async function getBudget(values: String) {
    if (values === 'null') {
      api.get(`${url}/api/quotations?company_id=2`).then((response) => {
        setBudget(response.data.data)
        console.log(tem)

        console.log(response.data.data)
        if (response.data.data.length === 0) {
          setTem(false)
        } else {
          setTem(true)
        }
      })
    } else {
      api
        .get(`${url}/api/quotations?company_id=1&search=${values}`)
        .then((response) => {
          setBudget(response.data.data)

          if (response.data.data.length === 0) {
            setTem(false)
          }
        })
    }
  }
  async function deleteBudget(values: number) {
    api.delete(`${url}/api/quotations/${values}`).then((response) => {
      value.length < 1 ? getBudget('null') : getBudget(value)
      setOpen(true)
    })
  }

  async function handleFilterValues(values: filterValuesProps) {
    console.log(values?.date.dateStart)
  }

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: number,
  ) => {
    deleteBudget(value)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    value.length < 1 ? getBudget('null') : getBudget(value)
  }
  React.useEffect(() => {
    getBudget('null')
  }, [])

  return (
    <main className={style.budgetMain}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Deletado com sucesso!
        </Alert>
      </Snackbar>
      <div className={style.pesquisa}>
        <div className={style.divPrimary}>
          <form onSubmit={handleSubmit}>
            <input
              value={value}
              onChange={handleChangeValue}
              type="text"
              placeholder="Procurar"
            ></input>
            <Button
              type="submit"
              variant="contained"
              className={style.buttonSearch}
              startIcon={
                <SearchIcon style={{ fontSize: '24px', margin: 'auto' }} />
              }
            ></Button>
            <ButtonFilterSelect handleFilterValues={handleFilterValues} />
          </form>
          <Button
            className={style.buttonBudget}
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
          >
            Novo orçamento
          </Button>
        </div>
      </div>
      <h6 className={style.h1}>Lista de orçamentos</h6>
      <table className={style.table}>
        <thead className={style.thead}>
          <tr>
            <th>Numero</th>
            <th>Cliente</th>
            <th>Placa</th>
            <th>Chassi</th>
            <th>Responsável</th>
            <th>Tipo Orçamento</th>
            <th>Tipo de Desconto</th>
            <th>Total Geral</th>
            <th>Ação</th>
          </tr>
        </thead>

        {!tem ? (
          <Box position={'absolute'} maxWidth={'100%'} minWidth={'80%'}>
            <CustomNoRowsOverlay />
          </Box>
        ) : (
          <tbody>
            {infoBudget?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.client?.name}</td>
                <td>{item.client_vehicle?.plate}</td>
                <td>{item.client_vehicle?.chasis}</td>
                <td>{item.technical_consultant?.name}</td>
                <td>{item.TotalGeralDesconto}</td>
                <td>{item.TotalGeral}</td>
                <td>{item.total}</td>
                <td>
                  <Button
                    onClick={(event) => handleClick(event, item.id)}
                    component="button"
                    startIcon={
                      <DeleteIcon
                        style={{
                          fontSize: '30px',
                          margin: 'auto',
                          color: 'red',
                        }}
                      />
                    }
                  ></Button>
                </td>
              </tr>
            ))}
            )
          </tbody>
        )}
      </table>
    </main>
  )
}

BudgetList.auth = true
