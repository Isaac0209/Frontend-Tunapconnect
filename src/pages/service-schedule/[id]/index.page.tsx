import * as React from 'react'
// import { useForm, SubmitHandler } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'

import Container from '@mui/material/Container'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import {
  ClientInfor,
  ClientVehicle,
  // ServiceSchedulesListProps,
  TechnicalConsultant,
} from '@/types/service-schedule'
import { ApiCore } from '@/lib/api'

import { useRouter } from 'next/router'

import List from '@mui/material/List'

import Stack from '@mui/material/Stack'

import {
  ButtonCenter,
  ButtonLeft,
  ButtonRight,
  ButtonSubmit,
  DividerCard,
  InfoCardName,
  InfoCardText,
  ListItemCard,
  TitleCard,
} from './styles'
import Skeleton from '@mui/material/Skeleton'
import PrintIcon from '@mui/icons-material/Print'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
// import * as locale from 'date-fns/locale/pt-BR';

import MenuItem from '@mui/material/MenuItem'
import { MoreOptionsButtonSelect } from '@/components/MoreOptionsButtonSelect'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { formatDateTime, formatDateTimeTimezone } from '@/ultis/formatDate'
import ActionAlerts from '@/components/ActionAlerts'
import { DataTimeInput } from '@/components/DataTimeInput'
import { ActionAlertsStateProps } from '@/components/ActionAlerts/ActionAlerts'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb'
import { listBreadcrumb } from '@/components/HeaderBreadcrumb/types'

import { PrintInspectionModal } from './components/PrintInspectionModal'
import { TableModal } from './components/TableModal'
import { useQuery } from 'react-query'
import { formatCPF } from '@/ultis/formatCPF'
import { formatPlate } from '@/ultis/formatPlate'

import { CompanyContext } from '@/contexts/CompanyContext'
import { ChecklistProps } from '@/pages/checklist/types'

const api = new ApiCore()

type isEditSelectedCardType =
  | 'client'
  | 'clientVehicle'
  | 'complaintEdit'
  | 'technicalConsultant'
  | 'budget'
  | 'schedule'
  | null

type updateData = {
  code: null
  promised_date: string
  technical_consultant_id: number | undefined
  client_id: number | undefined
  client_vehicle_id: number | undefined
  company_id: string | undefined
  chasis: string | undefined
  plate: string | undefined
  claims_service: any[]
}

const HeaderBreadcrumbData: listBreadcrumb[] = [
  {
    label: 'Tunap',
    href: '/company',
  },
  {
    label: 'Edição de agendamento',
    href: '/service-schedule/edit',
  },
]

export default function ServiceSchedulesEdit() {
  const [client, setClient] = useState<ClientInfor | null>()
  const [clientVehicle, setClientVehicle] = useState<ClientVehicle | null>()
  const [visitDate, setVisitDate] = useState<Dayjs | null>(null)
  const [technicalConsultant, setTechnicalConsultant] =
    useState<TechnicalConsultant | null>(null)
  const [technicalConsultantsList, setTechnicalConsultantsList] = useState<
    TechnicalConsultant[]
  >([])
  const [isEditSelectedCard, setIsEditSelectedCard] =
    useState<isEditSelectedCardType>(null)
  const [wasEdited, setWasEdited] = useState(false)
  const [defaultCheckListPrint, setDefaultCheckListPrint] = useState<
    number | null
  >(null)
  const [actionAlerts, setActionAlerts] =
    useState<ActionAlertsStateProps | null>(null)

  // const [rows, setRows] = useState<ServiceSchedulesListProps[]>([])

  const [openChecklistModal, setOpenChecklistModal] = useState(false)
  const [openPrintInspectionModal, setOpenPrintInspectionModal] =
    useState(false)

  const router = useRouter()

  const { companySelected } = useContext(CompanyContext)

  // const handleDelete = (id: number) => {
  //   setRows(rows.filter((row) => row.id !== id))
  // }
  const closeChecklistModal = () => {
    setOpenChecklistModal(false)
  }
  const closePrintInspectionModalModal = () => {
    setOpenPrintInspectionModal(false)
  }

  function handleIsEditSelectedCard(value: isEditSelectedCardType) {
    setIsEditSelectedCard(value)
    setWasEdited(true)
  }

  function handleTechnicalConsultant(id: number) {
    setTechnicalConsultant((prevState) => {
      return technicalConsultantsList.filter((c) => c.id === id)[0]
    })
  }

  function handleCancelled() {
    setWasEdited(false)
    setIsEditSelectedCard(null)
  }

  function handleAlert(isOpen: boolean) {
    setActionAlerts({
      isOpen,
      title: '',
      type: 'success',
    })
  }

  function handleDateSchedule(data: Dayjs | null) {
    setVisitDate(data)
  }

  async function onSave() {
    const dataFormatted: updateData = {
      code: null,
      promised_date: formatDateTimeTimezone(`${visitDate}`),
      // promised_date: "2023-04-2",
      technical_consultant_id: technicalConsultant?.id,
      client_id: client?.id,
      client_vehicle_id: clientVehicle?.id,
      company_id: `${companySelected}`,
      chasis: clientVehicle?.chassis,
      plate: clientVehicle?.plate,
      claims_service: [],
    }
    try {
      const respUpdate: any = await api.update(
        '/service-schedule/' + router.query.id,
        dataFormatted,
      )
      setIsEditSelectedCard(null)
      setActionAlerts({
        isOpen: true,
        title: `${respUpdate.data.msg ?? 'Salvo com sucesso!'}!`,
        type: 'success',
      })
    } catch (e: any) {
      setActionAlerts({
        isOpen: true,
        title: `${e.response.data.msg ?? 'Error inesperado'}!`,
        type: 'error',
      })
    }
  }

  // useEffect(() => {
  //   if (!wasEdited) {
  //     const { id } = router.query
  //     api
  //       .get(`/service-schedule/${id}`)
  //       .then((response) => {
  //         const {
  //           client,
  //           client_vehicle,
  //           technical_consultant,
  //           promised_date,
  //         } = response.data.data
  //         setClient({
  //           id: client.id,
  //           name: client.name ?? 'Não informado',
  //           cpf: client.document ?? 'Não informado',
  //           email: client.email ?? 'Não informado',
  //           telefone: client.phone ?? 'Não informado',
  //           address: client.address ?? 'Não informado',
  //         })

  //         setClientVehicle({
  //           id: client_vehicle.id,
  //           brand:
  //             client_vehicle?.vehicle?.model?.brand?.name ?? 'Não informado',
  //           chassis: client_vehicle?.chasis ?? 'Não informado',
  //           vehicle: client_vehicle?.vehicle?.name ?? 'Não informado',
  //           model:
  //             `${client_vehicle?.vehicle?.model?.name} - ${client_vehicle.vehicle.model_year}` ??
  //             'Não informado',
  //           color: client_vehicle?.color ?? 'Não informado',
  //           plate: client_vehicle?.plate ?? 'Não informado',
  //         })
  //         const promisedDate = dayjs(new Date(promised_date))
  //         setVisitDate(promisedDate)

  //         setTechnicalConsultant({
  //           id: technical_consultant?.id ?? 'Não informado',
  //           name: technical_consultant?.name ?? 'Não informado',
  //         })
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //         setClient(null)
  //         setClientVehicle(null)
  //         setTechnicalConsultant(null)
  //         setActionAlerts({
  //           isOpen: true,
  //           title: `${err.response?.data?.msg ?? 'Error inesperado'}!`,
  //           type: 'error',
  //           redirectTo: '/service-schedules/list',
  //         })
  //       })

  //     if (companyId) {
  //       api
  //         .get(`/technical-consultant?company_id=${router.query?.companyId}`)
  //         .then((resp) => {
  //           setTechnicalConsultantsList(
  //             resp.data.data.map((item: TechnicalConsultant) => ({
  //               id: item.id,
  //               name: item.name,
  //             })),
  //           )
  //         })
  //         .catch((err) => {
  //           console.log(err)
  //         })
  //     }
  //   }
  // }, [router.query, companyId, wasEdited])

  async function createCheckListBase() {
    try {
      const modelChecklist = await api.get('/checklist_model/list')
      const dataCreateChecklist = {
        company_id: companySelected,
        brand_id:
          dataServiceSchedule?.client_vehicle?.vehicle?.brand_id ?? null,
        vehicle_id: dataServiceSchedule?.client_vehicle?.vehicle?.id ?? null,
        model_id:
          dataServiceSchedule?.client_vehicle?.vehicle?.model?.id ?? null,
        vehicle_client_id: clientVehicle?.id ?? null,
        km: dataServiceSchedule?.client_vehicle?.mileage ?? null,
        fuel: null,
        client_id: client?.id,
        service_schedule_id: router?.query?.id
          ? parseInt(router?.query?.id as string)
          : null,
        checklist_model: 1,
        status: 'rascunho', // finalizado // pendente // rascunho
        stages: modelChecklist.data.data[0].stages,
      }
      if (modelChecklist.data.data.length > 0) {
        const createdDefault = await api.create(
          '/checklist',
          dataCreateChecklist,
        )
        router.replace(`/checklist/create/${createdDefault?.data?.data?.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const {
    data: dataTechnicalConsultantList,
    status: dataTechnicalConsultantListStatus,
  } = useQuery<TechnicalConsultant[]>(
    [
      'service_schedule',
      'by_id',
      'edit',
      'technical-consultant-list',
      'options',
    ],
    async () => {
      const resp = await api.get(
        `/technical-consultant?company_id=${companySelected}`,
      )
      return resp.data.data
    },
    { enabled: !!companySelected && wasEdited },
  )

  const { data: dataServiceSchedule, status: dataServiceScheduleStatus } =
    useQuery({
      queryKey: ['service_schedule', 'by_id', 'edit'],
      queryFn: async () => {
        const { id } = router.query
        const resp = await api.get(`/service-schedule/${id}`)

        return resp.data.data
      },
      enabled: !!router?.query?.id && !!companySelected && !wasEdited,
    })

  useEffect(() => {
    if (dataTechnicalConsultantListStatus === 'success') {
      setTechnicalConsultantsList(
        dataTechnicalConsultantList.map((item: TechnicalConsultant) => ({
          id: item.id,
          name: item.name,
        })),
      )
    }
  }, [dataTechnicalConsultantListStatus, dataTechnicalConsultantList])

  useEffect(() => {
    if (dataServiceScheduleStatus === 'success') {
      const { client, client_vehicle, technical_consultant, promised_date } =
        dataServiceSchedule
      setClient({
        id: client.id,
        name: client.name ?? 'Não informado',
        cpf: client.document ?? 'Não informado',
        email: client.email ?? 'Não informado',
        telefone: client.phone ?? 'Não informado',
        address: client.address ?? 'Não informado',
      })

      setClientVehicle({
        id: client_vehicle.id,
        brand: client_vehicle?.vehicle?.model?.brand?.name ?? 'Não informado',
        chassis: client_vehicle?.chasis ?? 'Não informado',
        vehicle: client_vehicle?.vehicle?.name ?? 'Não informado',
        model:
          `${client_vehicle?.vehicle?.model?.name} - ${client_vehicle.vehicle.model_year}` ??
          'Não informado',
        color: client_vehicle?.color ?? 'Não informado',
        plate: client_vehicle?.plate ?? 'Não informado',
      })
      const promisedDate = dayjs(new Date(promised_date))
      setVisitDate(promisedDate)

      setTechnicalConsultant({
        id: technical_consultant?.id ?? 'Não informado',
        name: technical_consultant?.name ?? 'Não informado',
      })
    }
  }, [dataServiceScheduleStatus, dataServiceSchedule])

  const { data: serviceScheduleDefault, status: serviceScheduleDefaultStatus } =
    useQuery<ChecklistProps>(
      [
        'service_schedule',
        'by_id',
        'edit',
        'openModal',
        'default',
        companySelected,
        router.query.id,
      ],
      async () => {
        const resp = await api.get(
          `/checklist/list?company_id=${companySelected}&service_schedule_id=${router.query.id}&orderby=updated_at desc&limit=1`,
        )
        if (resp.data.data.length > 0) {
          setDefaultCheckListPrint(resp.data.data[0].id)
        } else {
          setDefaultCheckListPrint(null)
        }
        return resp.data.data
      },
      {
        enabled: openPrintInspectionModal,
      },
    )

  console.log(serviceScheduleDefaultStatus)

  useEffect(() => {
    localStorage.removeItem('service-schedule-list')
  }, [])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <HeaderBreadcrumb
            data={HeaderBreadcrumbData}
            title="Agenda de Serviços"
          />
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
          <Stack spacing={3}>
            {/* cliente */}
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <TitleCard>Cliente</TitleCard>
                <MoreOptionsButtonSelect
                  handleIsEditSelectedCard={handleIsEditSelectedCard}
                  typeEdit="client"
                  // disabledButton={true}
                />
              </Stack>
              <DividerCard />
              <List dense={false}>
                <ListItemCard alignItems="flex-start">
                  <InfoCardName>Nome:</InfoCardName>{' '}
                  {client?.name ? (
                    <InfoCardText>{client?.name}</InfoCardText>
                  ) : (
                    <InfoCardText width="100%">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem', lineHeight: 1.5 }}
                        width="100%"
                      />
                    </InfoCardText>
                  )}
                </ListItemCard>
                <ListItemCard alignItems="flex-start">
                  <InfoCardName>CPF:</InfoCardName>{' '}
                  {client?.cpf ? (
                    <InfoCardText>{formatCPF(client?.cpf)}</InfoCardText>
                  ) : (
                    <InfoCardText width="100%">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem', lineHeight: 1.5 }}
                        width="100%"
                      />
                    </InfoCardText>
                  )}
                </ListItemCard>
                {client?.telefone ? (
                  client?.telefone.map((phone, index) => (
                    <ListItemCard
                      key={index + '-' + phone}
                      alignItems="flex-start"
                    >
                      <InfoCardName>Telefone:</InfoCardName>{' '}
                      <InfoCardText>{phone}</InfoCardText>
                    </ListItemCard>
                  ))
                ) : (
                  <ListItemCard>
                    <InfoCardName>Telefone:</InfoCardName>{' '}
                    <InfoCardText width="100%">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem', lineHeight: 1.5 }}
                        width="100%"
                      />
                    </InfoCardText>
                  </ListItemCard>
                )}
                {client?.email ? (
                  client?.email.map((email, index) => (
                    <ListItemCard
                      key={index + '-' + email}
                      alignItems="flex-start"
                    >
                      <InfoCardName>E-mail:</InfoCardName>{' '}
                      <InfoCardText>{email}</InfoCardText>
                    </ListItemCard>
                  ))
                ) : (
                  <ListItemCard alignItems="flex-start">
                    <InfoCardName>E-mail:</InfoCardName>{' '}
                    <InfoCardText width="100%">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem', lineHeight: 1.5 }}
                        width="100%"
                      />
                    </InfoCardText>
                  </ListItemCard>
                )}
                {client?.address ? (
                  client?.address.map((address, index) => (
                    <ListItemCard
                      key={index + '-' + address}
                      alignItems="flex-start"
                    >
                      <InfoCardName>Endereço:</InfoCardName>{' '}
                      <InfoCardText>{address}</InfoCardText>
                    </ListItemCard>
                  ))
                ) : (
                  <ListItemCard alignItems="flex-start">
                    <InfoCardName>Endereço:</InfoCardName>{' '}
                    <InfoCardText width="100%">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem', lineHeight: 1.5 }}
                        width="100%"
                      />
                    </InfoCardText>
                  </ListItemCard>
                )}
              </List>
            </Paper>
            {/* Veículo */}
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <TitleCard>Veículo</TitleCard>
                <MoreOptionsButtonSelect
                  handleIsEditSelectedCard={handleIsEditSelectedCard}
                  typeEdit="clientVehicle"
                  disabledButton={true}
                />
              </Stack>
              <DividerCard />
              <List dense={false}>
                <ListItemCard>
                  <InfoCardName>Marca:</InfoCardName>{' '}
                  {clientVehicle?.brand ? (
                    <InfoCardText>{clientVehicle?.brand}</InfoCardText>
                  ) : (
                    <InfoCardText width="100%">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem', lineHeight: 1.5 }}
                        width="100%"
                      />
                    </InfoCardText>
                  )}
                </ListItemCard>
                <ListItemCard>
                  <InfoCardName>Modelo:</InfoCardName>{' '}
                  {clientVehicle?.model ? (
                    <InfoCardText>{clientVehicle?.model}</InfoCardText>
                  ) : (
                    <InfoCardText width="100%">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem', lineHeight: 1.5 }}
                        width="100%"
                      />
                    </InfoCardText>
                  )}
                </ListItemCard>
                <ListItemCard>
                  <InfoCardName>Veículo:</InfoCardName>{' '}
                  {clientVehicle?.vehicle ? (
                    <InfoCardText>{clientVehicle?.vehicle}</InfoCardText>
                  ) : (
                    <InfoCardText width="100%">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem', lineHeight: 1.5 }}
                        width="100%"
                      />
                    </InfoCardText>
                  )}
                </ListItemCard>
                <ListItemCard>
                  <InfoCardName>Cor:</InfoCardName>{' '}
                  {clientVehicle?.color ? (
                    <InfoCardText>{clientVehicle?.color}</InfoCardText>
                  ) : (
                    <InfoCardText width="100%">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem', lineHeight: 1.5 }}
                        width="100%"
                      />
                    </InfoCardText>
                  )}
                </ListItemCard>
                <ListItemCard>
                  <InfoCardName>Chassi:</InfoCardName>{' '}
                  {clientVehicle?.chassis ? (
                    <InfoCardText>{clientVehicle?.chassis}</InfoCardText>
                  ) : (
                    <InfoCardText width="100%">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem', lineHeight: 1.5 }}
                        width="100%"
                      />
                    </InfoCardText>
                  )}
                </ListItemCard>
                <ListItemCard>
                  <InfoCardName>Placa:</InfoCardName>{' '}
                  {clientVehicle?.plate ? (
                    <InfoCardText>
                      {formatPlate(clientVehicle?.plate)}
                    </InfoCardText>
                  ) : (
                    <InfoCardText width="100%">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem', lineHeight: 1.5 }}
                        width="100%"
                      />
                    </InfoCardText>
                  )}
                </ListItemCard>
              </List>
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={5} lg={5}>
          <Stack spacing={2}>
            <Stack
              spacing={2}
              direction="row"
              display="flex"
              justifyContent="center"
            >
              <ButtonLeft onClick={() => setOpenChecklistModal(true)}>
                Listar Checklists
              </ButtonLeft>
              <ButtonCenter
                // disabled={defaultCheckListPrint === null}
                onClick={() => {
                  setOpenPrintInspectionModal(true)
                }}
              >
                <PrintIcon />
              </ButtonCenter>
              <ButtonRight
                startIcon={<AddCircleOutlineIcon />}
                onClick={createCheckListBase}
              >
                Novo
              </ButtonRight>
            </Stack>
            {/* <Stack
              spacing={2}
              direction="row"
              display="flex"
              justifyContent="center"
            >
              <ButtonLeft disabled>Listar Orçamentos</ButtonLeft>
              <ButtonCenter disabled>
                <PrintIcon />
              </ButtonCenter>
              <ButtonRight disabled startIcon={<AddCircleOutlineIcon />}>
                Novo
              </ButtonRight>
            </Stack> */}
            {/* Agendamento */}
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <TitleCard>AGENDAMENTO</TitleCard>
                <MoreOptionsButtonSelect
                  handleIsEditSelectedCard={handleIsEditSelectedCard}
                  typeEdit="schedule"
                />
              </Stack>
              <DividerCard />
              <List dense={false}>
                <ListItemCard>
                  <InfoCardName>Número do atendimento:</InfoCardName>{' '}
                  {router.query.id ? (
                    <InfoCardText>{router.query.id}</InfoCardText>
                  ) : (
                    <InfoCardText width="100%">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem', lineHeight: 1.5 }}
                        width="100%"
                      />
                    </InfoCardText>
                  )}
                </ListItemCard>
                <ListItemCard>
                  <InfoCardName>Data da visita:</InfoCardName>
                  {isEditSelectedCard === 'schedule' && (
                    <DataTimeInput
                      dateSchedule={visitDate}
                      handleDateSchedule={handleDateSchedule}
                    />
                  )}
                  {isEditSelectedCard !== 'schedule' && visitDate && (
                    <InfoCardText>
                      {formatDateTime(`${visitDate}`)}
                    </InfoCardText>
                  )}
                  {!visitDate && (
                    <InfoCardText width="100%">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem', lineHeight: 1.5 }}
                        width="100%"
                      />
                    </InfoCardText>
                  )}
                </ListItemCard>
              </List>
            </Paper>
            {wasEdited && isEditSelectedCard === 'schedule' && (
              <Grid item xs={12} md={12} lg={12} alignSelf="flex-end">
                <Paper
                  sx={{
                    p: '0 2',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'transparent',
                  }}
                  elevation={0}
                >
                  <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <ButtonSubmit
                      variant="contained"
                      size="small"
                      onClick={() => onSave()}
                    >
                      save
                    </ButtonSubmit>
                    <ButtonSubmit
                      variant="contained"
                      size="small"
                      onClick={() => handleCancelled()}
                    >
                      cancelar
                    </ButtonSubmit>
                  </Stack>
                </Paper>
              </Grid>
            )}

            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <TitleCard>Consultor técnico</TitleCard>
                <MoreOptionsButtonSelect
                  handleIsEditSelectedCard={handleIsEditSelectedCard}
                  typeEdit="technicalConsultant"
                />
              </Stack>
              <DividerCard />
              <List dense={false}>
                <ListItemCard>
                  <InfoCardName>Nome:</InfoCardName>{' '}
                  {isEditSelectedCard !== 'technicalConsultant' &&
                  technicalConsultant?.name ? (
                    <InfoCardText>{technicalConsultant?.name}</InfoCardText>
                  ) : (
                    isEditSelectedCard !== 'technicalConsultant' && (
                      <InfoCardText width="100%">
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: '1rem', lineHeight: 1.5 }}
                          width="100%"
                        />
                      </InfoCardText>
                    )
                  )}
                  {isEditSelectedCard === 'technicalConsultant' && (
                    <Box width="100%">
                      <TextField
                        id="standard-select-currency"
                        select
                        sx={{
                          width: '100%',
                        }}
                        value={technicalConsultant?.id}
                        variant="standard"
                        onChange={(e) =>
                          handleTechnicalConsultant(parseInt(e.target.value))
                        }
                      >
                        {technicalConsultantsList.map((option) => (
                          <MenuItem
                            key={option.id + option.name}
                            value={option.id}
                          >
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  )}
                </ListItemCard>
                <ListItemCard>
                  <InfoCardName>Código consultor:</InfoCardName>{' '}
                  {technicalConsultant?.id ? (
                    <InfoCardText>{technicalConsultant?.id}</InfoCardText>
                  ) : (
                    <InfoCardText width="100%">
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: '1rem', lineHeight: 1.5 }}
                        width="100%"
                      />
                    </InfoCardText>
                  )}
                </ListItemCard>
              </List>
            </Paper>
            {wasEdited && isEditSelectedCard === 'technicalConsultant' && (
              <Grid item xs={12} md={12} lg={12} alignSelf="flex-end">
                <Paper
                  sx={{
                    p: '0 2',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'transparent',
                  }}
                  elevation={0}
                >
                  <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <ButtonSubmit
                      variant="contained"
                      size="small"
                      onClick={() => onSave()}
                    >
                      save
                    </ButtonSubmit>
                    <ButtonSubmit
                      variant="contained"
                      size="small"
                      onClick={() => handleCancelled()}
                    >
                      cancelar
                    </ButtonSubmit>
                  </Stack>
                </Paper>
              </Grid>
            )}
          </Stack>
        </Grid>
        {actionAlerts !== null && (
          <ActionAlerts
            isOpen={actionAlerts.isOpen}
            title={actionAlerts.title}
            type={actionAlerts.type}
            handleAlert={handleAlert}
          />
        )}
      </Grid>
      <TableModal
        isOpen={openChecklistModal}
        title="Lista de checklists"
        serviceScheduleId={router?.query?.id as string}
        closeChecklistModal={closeChecklistModal}
      />
      {serviceScheduleDefaultStatus === 'success' &&
        defaultCheckListPrint !== null && (
          <PrintInspectionModal
            isOpen={openPrintInspectionModal}
            closeModal={closePrintInspectionModalModal}
            checkListIdForModal={defaultCheckListPrint}
            checkListData={serviceScheduleDefault as ChecklistProps}
          />
        )}
    </Container>
  )
}

ServiceSchedulesEdit.auth = true
