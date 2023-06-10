import * as React from "react";
import style from "./style.module.css";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ButtonFilterSelect from "./components/ButtonFilterSelect";
import DeleteIcon from "@mui/icons-material/Delete";
import { ApiCore } from "@/lib/api";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
export default function BudgetList() {
  const [infoBudget, setBudget] = React.useState();
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const api = new ApiCore();
  const url = "http://a.tunapconnect.com";
  type filterValuesProps = {
    date: {
      dateStart: string | null;
      dateEnd: string | null;
    };
  };
  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  async function getBudget(values: String) {
    if (values == "null") {
      api.get(`${url}/api/quotations?company_id=1`).then((response) => {
        setBudget(response.data.data);
        console.log(response.data.data);
      });
    } else {
      api
        .get(`${url}/api/quotations?company_id=2&search=${values}`)
        .then((response) => {
          setBudget(response.data.data);
          console.log(response.data.data);
        });
    }
  }
  async function deleteBudget(values: number) {
    api.delete(`${url}/api/quotations/${values}`).then((response) => {
      value.length < 1 ? getBudget("null") : getBudget(value);
      setOpen(true);
    });
  }

  async function handleFilterValues(values: filterValuesProps) {
    console.log(values?.date.dateStart);
  }

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: number
  ) => {
    deleteBudget(value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    value.length < 1 ? getBudget("null") : getBudget(value);
  };
  React.useEffect(() => {
    getBudget("null");
  }, []);

  return (
    <main className={style.budgetMain}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Deletado com sucesso!
        </Alert>
      </Snackbar>
      <h1 className={style.h1}>Orçamentos</h1>
      <div className={style.pesquisa}>
        <div className={style.divPrimary}>
          <form onSubmit={handleSubmit}>
            <input
              value={value}
              onChange={handleChangeValue}
              type="text"
              placeholder="Pesquisar"
            ></input>
            <Button
              type="submit"
              variant="contained"
              className={style.buttonSearch}
              startIcon={
                <SearchIcon style={{ fontSize: "40px", margin: "auto" }} />
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
      <h1 className={style.h1}>Lista de orçamentos</h1>
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
                      style={{ fontSize: "40px", margin: "auto", color: "red" }}
                    />
                  }
                ></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

BudgetList.auth = true;
