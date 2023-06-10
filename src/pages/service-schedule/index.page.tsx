import * as React from "react";
import { useForm } from "react-hook-form";
import { useContext, useState, useMemo, useEffect } from "react";

import Container from "@mui/material/Container";

import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

import { ButtonAdd, ButtonIcon } from "./style";
import { ServiceSchedulesListProps } from "@/types/service-schedule";
import { ApiCore } from "@/lib/api";
import IconButton from "@mui/material/IconButton";
import { Delete } from "@mui/icons-material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ActionDeleteConfirmations } from "@/helpers/ActionConfirmations";
import { useRouter } from "next/router";
import { TableApp } from "@/components/TableApp";
import { CompanyContext } from "@/contexts/CompanyContext";
import { listBreadcrumb } from "@/components/HeaderBreadcrumb/types";
import HeaderBreadcrumb from "@/components/HeaderBreadcrumb";

import { useQuery } from "react-query";
import Skeleton from "@mui/material/Skeleton";
import { formatDateTime } from "@/ultis/formatDate";
import { ServiceScheduleContext } from "@/contexts/ServiceScheduleContext";
import ButtonFilterSelect from "./components/ButtonFilterSelect";

type SearchFormProps = {
  search: string;
};

type DataFetchProps = {
  paginate: {
    current_page: number;
    total_pages: number;
    total_results: number;
  };
  serviceSchedulesList: ServiceSchedulesListProps[] | [];
};

type filterValuesProps = {
  date: {
    dateStart: string | null;
    dateEnd: string | null;
  };
};

const api = new ApiCore();

const HeaderBreadcrumbData: listBreadcrumb[] = [
  {
    label: "Tunap",
    href: "/company",
  },
  {
    label: "Lista de agendamentos",
    href: "/service-schedules/list",
  },
];

export default function ServiceSchedulesList() {
  const [pages, setPages] = useState<{
    next: boolean;
    previous: boolean;
  }>({ next: true, previous: true });
  const [filterValues, setFilterValues] = useState<filterValuesProps>();

  const { companySelected } = useContext(CompanyContext);
  const { setListServiceSchedule } = useContext(ServiceScheduleContext);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      search: "",
    },
  });

  function onSubmitSearch(data: SearchFormProps) {
    router.push(
      `/service-schedule?company_id=${companySelected}${
        data.search ? "&search=" + data.search : ""
      }${
        router.query.current_page
          ? "&current_page=" + router.query.current_page
          : ""
      }`
    );
  }

  const handleDelete = (id: number) => {
    refetch();
  };

  let url = `/service-schedule?company_id=${companySelected}`;

  if (router.query.limit) {
    url += `&limit=${router.query.limit}`;
  }

  if (router.query.current_page) {
    url += `&current_page=${router.query.current_page}`;
  }

  if (router.query.search) {
    url += `&search=${router.query.search}`;
  }

  if (router.query.promised_date_min) {
    url += `&promised_date_min=${filterValues?.date.dateStart}`;
  }
  if (router.query.promised_date_max) {
    url += `&promised_date_max=${filterValues?.date.dateEnd}`;
  }
  if (router.query.orderby) {
    url += "&orderby=promised_date";
  }

  async function handleFilterValues(values: filterValuesProps) {
    setFilterValues(values);
    if (values?.date.dateStart) {
      url += `&promised_date_min=${values?.date.dateStart}`;
    }
    if (values?.date.dateEnd) {
      url += `&promised_date_max=${values?.date.dateEnd}`;
    }
    url += "&orderby=promised_date";
    console.log(url);
    await router.push(url);
  }
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "Número",
        headerClassName: "super-app-theme--header",
        width: 80,
        type: "number",
        align: "center",
        sortable: false,
      },
      {
        field: "promised_date",
        headerName: "Data Prometida",
        headerClassName: "super-app-theme--header",
        width: 150,
        type: "text",
        align: "left",
        sortable: false,
        valueGetter: (params: GridValueGetterParams) =>
          `${formatDateTime(params.row.promised_date) || ""}`,
      },
      {
        field: "client",
        headerName: "Cliente",
        headerClassName: "super-app-theme--header",
        flex: 1,
        maxWidth: 230,
        minWidth: 120,
        align: "left",
        sortable: false,
      },
      {
        field: "plate",
        headerName: "Placa",
        headerClassName: "super-app-theme--header",
        width: 120,
        sortable: false,
      },
      {
        field: "chassis",
        headerName: "Chassis",
        headerClassName: "super-app-theme--header",
        flex: 1,
        maxWidth: 240,
        minWidth: 120,
        sortable: false,
      },
      {
        field: "technical_consultant",
        headerName: "Responsavél",
        headerClassName: "super-app-theme--header",
        flex: 1,
        maxWidth: 200,
        minWidth: 120,
        sortable: false,
      },
      {
        field: "vehicle",
        headerName: "Veículo",
        headerClassName: "super-app-theme--header",
        width: 160,
        sortable: false,
      },
      // {
      //   field: 'totalDiscount',
      //   headerName: 'Tipo Desconto',
      //   headerClassName: 'super-app-theme--header',
      //   // type: 'number',
      //   width: 110,
      //   align: 'center',
      //   sortable: false,
      // valueGetter: (params: GridValueGetterParams) =>
      //   `${formatMoneyPtBR(params.row.totalDiscount) || ''}`,
      // },
      // {
      //   field: 'total',
      //   headerName: 'Total Geral',
      //   headerClassName: 'super-app-theme--header',
      //   // type: 'number',
      //   width: 110,
      //   align: 'center',
      //   sortable: false,
      //   valueGetter: (params: GridValueGetterParams) =>
      //     `${formatMoneyPtBR(params.row.total) || ''}`,
      // },
      {
        field: "action",
        headerName: "Ação",
        headerClassName: "super-app-theme--header",
        sortable: false,
        width: 90,
        align: "left",
        renderCell: (params: GridRenderCellParams) => {
          const onClick = (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            const id = params.id;
            ActionDeleteConfirmations(id as number, handleDelete);
          };
          return (
            <IconButton
              aria-label="search"
              color="warning"
              onClick={onClick}
              sx={{ marginLeft: 1, color: "red" }}
            >
              <Delete />
            </IconButton>
          );
        },
      },
    ],
    []
  );

  const {
    data: rows,
    isSuccess,
    // isInitialLoading,
    // isLoading,
    // isFetched,
    refetch,
    isFetching,
  } = useQuery<DataFetchProps>(
    ["service-scheduler-list", companySelected],
    () =>
      api.get(url).then((response) => {
        setListServiceSchedule(response.data.data);
        console.log(response);
        localStorage.setItem(
          "service-schedule-list",
          JSON.stringify(response.data.data)
        );
        const resp = response.data.data.map((data: any) => {
          return {
            id: data?.id ?? "Não informado",
            promised_date: data?.promised_date ?? "Não informado",
            client: data?.client?.name ?? "Não informado",
            plate: data?.client_vehicle?.plate ?? "Não informado",
            chassis: data?.client_vehicle?.chasis ?? "Não informado",
            technical_consultant:
              data?.technical_consultant?.name ?? "Não informado",
            vehicle: data?.client_vehicle?.vehicle?.name ?? "não definido",
          };
        });

        if (response.data.total_pages === 1)
          setPages({
            next: false,
            previous: false,
          });
        if (!router.query.current_page) {
          if (response.data.current_page === 1) {
            setPages((prevState) => ({ ...prevState, previous: false }));
          }
        }

        return {
          paginate: {
            current_page: response.data.current_page,
            total_pages: response.data.total_pages,
            total_results: response.data.total_results,
          },
          serviceSchedulesList: resp,
        };
      }),

    {
      // enabled: !!companySelected || !!url,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    }
  );

  function handlePages(nextPage: any): void {
    let newCurrent_page = 1;
    const actualCurrent_page = router.query.current_page
      ? parseInt(router.query.current_page as string)
      : 1;

    if (!rows?.paginate) {
      return;
    }

    if (nextPage === "next") {
      newCurrent_page = actualCurrent_page + 1;
      if (newCurrent_page > rows?.paginate.total_pages) {
        return;
      }
    }
    if (nextPage === "back") {
      newCurrent_page = actualCurrent_page - 1;
      if (newCurrent_page < 1) {
        return;
      }
    }

    const newUrlPagination = `/service-schedule?company_id=${companySelected}${
      router.query.search ? "&search=" + router.query.search : ""
    }${"&current_page=" + newCurrent_page}${
      router.query.limit ? "&limit=" + router.query.limit : ""
    }`;

    router.push(newUrlPagination);
  }
  useEffect(() => {
    async function refetchUrl() {
      if (router.query.search) {
        setValue("search", router.query.search as string);
      } else {
        setValue("search", "");
      }

      if (router.query.current_page) {
        const currentPage = parseInt(router.query.current_page as string);
        if (rows?.paginate) {
          if (currentPage >= rows?.paginate.total_pages) {
            setPages({
              next: false,
              previous: true,
            });
          } else {
            if (pages.next === false) {
              setPages((prevState) => ({ ...prevState, next: true }));
            }
          }
          if (currentPage <= 1) {
            setPages({
              next: true,
              previous: false,
            });
          } else {
            if (pages.previous === false) {
              setPages((prevState) => ({ ...prevState, previous: true }));
            }
          }
        }
      }

      await refetch();
    }
    refetchUrl();
  }, [router]);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "row" }}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                md={12}
                lg={8}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit(onSubmitSearch)}
                  sx={{ flexWrap: "nowrap", display: "flex", flex: 1 }}
                >
                  <TextField
                    label="Procura"
                    id="outlined-size-small"
                    size="small"
                    sx={{ flex: 1, width: "100%" }}
                    {...register("search")}
                  />

                  <ButtonIcon
                    type="submit"
                    aria-label="search"
                    color="primary"
                    sx={{ marginLeft: 1 }}
                  >
                    <SearchIcon />
                  </ButtonIcon>
                </Box>
                <Box>
                  <ButtonFilterSelect handleFilterValues={handleFilterValues} />
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ButtonAdd
                  size="large"
                  variant="contained"
                  sx={{ alignSelf: "flex-end" }}
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={async () => {
                    await router.push(`/service-schedule/create`);
                  }}
                  // disabled
                >
                  Adicionar novo
                </ButtonAdd>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <HeaderBreadcrumb
            data={HeaderBreadcrumbData}
            title="Lista de Agendamentos"
          />
        </Grid>

        <Grid item xs={12}>
          {!isFetching ? (
            <TableApp
              columns={columns}
              rowsData={isSuccess ? rows.serviceSchedulesList : []}
              handlePages={handlePages}
              pages={pages}
              loading={isFetching}
              companyId={companySelected}
            />
          ) : (
            <Skeleton variant="rounded" sx={{ width: "100%" }} height={150} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

ServiceSchedulesList.auth = true;
