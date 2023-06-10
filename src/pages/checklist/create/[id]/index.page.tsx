import { ReactNode, SyntheticEvent, useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { LinkNext, TabItem, TabsContainer, Title } from "./styles";
import TabContent from "./TabContent";
import { ApiCore } from "@/lib/api";
import { Backdrop, CircularProgress, Skeleton } from "@mui/material";
import {
  ChecklistProps,
  ResponseGetCheckList,
  StagesDataProps,
} from "../../types";

import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ActionAlerts from "@/components/ActionAlerts";

// import { useForm } from 'react-hook-form'

// type InspectionCarDataType = {
//   name: string
//   url_image: string
//   value: {
//     id: number
//     type: 'amassado' | 'riscado' | 'quebrado' | 'faltando' | 'none'
//     positions: {
//       web: {
//         top: number
//         left: number
//       }
//       mobile: {
//         top: number
//         left: number
//       }
//     }
//   }[]
//   comment: string
//   images: {
//     id: number
//     name: string
//     url: string
//     size: string
//   }[]
// }

// type CheckListSignatures = {
//   name: string
//   rules: {
//     required: boolean
//   }
//   image: string[]
// }

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

interface RefTabContentRefType {
  handleOpenAlertDialog: (value: number) => void;
  handleGetValuesForm: () => Promise<StagesDataProps>;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export type ActionAlertsStateProps = {
  isOpen: boolean;
  title: string;
  type: "error" | "warning" | "success";
  redirectTo?: string | undefined;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ position: "relative" }}>{children}</Box>}
    </div>
  );
}

export default function ChecklistCreateById() {
  const [painelValue, setPainelValue] = useState(0);
  // const [typeSubmitForm, setTypeSubmitForm] = useState<
  //   'salvo' | 'finalizado' | 'rascunho'
  // >('rascunho')

  const [actionAlerts, setActionAlerts] = useState<ActionAlertsStateProps>({
    isOpen: false,
    title: "",
    type: "success",
  });
  const queryClient = useQueryClient();
  const api = new ApiCore();
  const router = useRouter();

  const tabContentRef = useRef<RefTabContentRefType>(null);

  const updateChecklistmutations = useMutation(
    (newDataChecklist: ChecklistProps) => {
      return api
        .update(`/checklist/${router?.query?.id}`, newDataChecklist)
        .then((resp) => {
          return resp.data.data[0];
        });
    },

    {
      onSuccess: (data) => {
        // queryClient.invalidateQueries({ queryKey: ['checklist-createByID'] })
        // queryClient.setQueryData(['checklist-createByID'], data)
        setActionAlerts({
          isOpen: true,
          title: "Salvo com sucesso",
          type: "success",
        });
        queryClient.invalidateQueries("checklist-createByID");
        return data;
      },
      onError: (err: any) => {
        setActionAlerts({
          isOpen: true,
          title: "Salvo com sucesso",
          type: "error",
        });
        console.log(err);
      },
    }
  );

  const { data, isSuccess, isLoading, isFetching } =
    useQuery<ResponseGetCheckList>(
      ["checklist-createByID"],
      () =>
        api
          .get(`/checklist/${router?.query?.id}?company_id=`)
          .then((response) => {
            return response.data.data;
          }),
      {
        refetchOnWindowFocus: false,
        enabled: !!router?.query?.id,
      }
    );

  function handleAlert(isOpen: boolean) {
    setActionAlerts((previState) => ({
      ...previState,
      isOpen,
    }));
  }

  async function handleAddListCheckList(stageData: StagesDataProps) {
    const isFinalizedArray = data?.stages.map((item) => {
      if (item.name === stageData.name) {
        return stageData.status;
      }

      return item.status;
    });
    const isFinalized = isFinalizedArray?.every(
      (item) => item === "finalizado"
    );
    const dataForPost = {
      company_id: data?.company_id,
      brand_id: data?.brand_id,
      vehicle_id: data?.vehicle_id,
      model_id: data?.vehicle, // verificar
      vehicle_client_id: data?.vehicle_client_id,
      km: data?.km,
      fuel: data?.fuel,
      client_id: data?.client_id,
      service_schedule_id: data?.service_schedule_id,
      checklist_model: data?.checklist_model,
      status: isFinalized ? "finalizado" : "pendente",
      stages: data?.stages.map((item) => {
        // if (item.name === stageData.name) {
        //   return {
        //     ...stageData,
        //     status: typeSubmitForm,
        //   }
        // }

        return item.name === stageData.name ? stageData : item;
      }),
    };

    // @ts-ignore
    updateChecklistmutations.mutate(dataForPost);
  }

  const handleChange = async (event: SyntheticEvent, newValue: number) => {
    // console.log(newValue)
    // if (data?.stages[value].status !== 'finalizado') setValue(newValue)
    // if (tabContentRef.current && tabContentRef.current.handleOpenAlertDialog) {
    //   tabContentRef.current.handleOpenAlertDialog(newValue)
    // }
    if (tabContentRef.current && tabContentRef.current.handleGetValuesForm) {
      const result = await tabContentRef.current.handleGetValuesForm();
      console.log(result);
      const sessionStorageData = sessionStorage.getItem(
        `${process.env.NEXT_PUBLIC_APP_SESSION_STORAGE_NAME}-${router.query.id}`
      );

      if (sessionStorageData) {
        const storageStage: StagesDataProps[] = JSON.parse(sessionStorageData);
        const storageStageActualIndex = storageStage.findIndex(
          (item: any) => item.name === result.name
        );

        if (storageStageActualIndex >= 0) {
          const newStorageSessionFiltered = storageStage.filter(
            (item) => item.name !== result.name
          );

          sessionStorage.setItem(
            `${process.env.NEXT_PUBLIC_APP_SESSION_STORAGE_NAME}-${router.query.id}`,
            JSON.stringify([...newStorageSessionFiltered, result])
          );
        } else {
          sessionStorage.setItem(
            `${process.env.NEXT_PUBLIC_APP_SESSION_STORAGE_NAME}-${router.query.id}`,
            JSON.stringify([...storageStage, result])
          );
        }
      } else {
        sessionStorage.setItem(
          `${process.env.NEXT_PUBLIC_APP_SESSION_STORAGE_NAME}-${router.query.id}`,
          JSON.stringify([result])
        );
      }
    }
    setPainelValue(newValue);
  };

  function handleChangeTabContent(newValue: number) {
    setPainelValue(newValue);
  }
  useEffect(() => {
    console.log("rendering");
    if (data?.stages) {
      if (data?.stages.length > 0) {
        sessionStorage.setItem(
          `${process.env.NEXT_PUBLIC_APP_SESSION_STORAGE_NAME}-${router.query.id}`,
          JSON.stringify(data?.stages)
        );
      }
    }
  }, []);
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={400}
          sx={{ borderRadius: 2 }}
        />
      </Container>
    );
  }

  if (isSuccess) {
    // console.log(data)
    return (
      <>
        <Box sx={{ mt: 2, ml: 2 }}>
          <LinkNext href={`/service-schedule/${data.service_schedule_id}`}>
            <Title variant="h6">
              Agenda:{router.query.id} - {data?.client?.name ?? "Não informado"}
            </Title>
          </LinkNext>
        </Box>
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{ p: 2, display: "flex", flexDirection: "column", pb: 1 }}
              >
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TabsContainer
                    value={painelValue}
                    onChange={handleChange}
                    textColor="inherit"
                    centered
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                  >
                    {data?.stages?.length > 0 &&
                      data.stages.map((stage, index) => {
                        // const isDisabled = stage.status === 'finalizado'
                        return (
                          <TabItem
                            key={stage.name + Math.random() * 2000}
                            label={stage.name}
                            {...a11yProps(index)}
                            // disabled={isDisabled}
                          />
                        );
                      })}
                  </TabsContainer>
                </Box>
                {data?.stages?.length > 0 &&
                  data.stages.map((stage, index) => {
                    return (
                      <TabPanel
                        key={`${Math.random() * 2000}-${stage.name}-${index}`}
                        value={painelValue}
                        index={index}
                      >
                        <TabContent
                          stageItems={stage.itens}
                          stageData={stage}
                          ref={tabContentRef}
                          // checklistModel={data}
                          stageName={stage.name}
                          formIDSubmit={`form-${stage.name}-${index}`}
                          handleAddListCheckList={handleAddListCheckList}
                          isClosed={stage.status === "finalizado"}
                          handleChangeTabContent={handleChangeTabContent}
                        />
                      </TabPanel>
                    );
                  })}
              </Paper>
              <Grid
                item
                xs={12}
                justifyContent="flex-end"
                sx={{
                  marginTop: 2,
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                }}
              ></Grid>
            </Grid>
          </Grid>
        </Container>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isFetching}
          onClick={() => {}}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <ActionAlerts
          isOpen={actionAlerts?.isOpen && !isFetching}
          title={"salvo"}
          type={"success"}
          handleAlert={handleAlert}
        />
      </>
    );
  }
}

ChecklistCreateById.auth = true;
