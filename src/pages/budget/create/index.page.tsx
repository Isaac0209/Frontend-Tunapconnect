import * as React from 'react'
// import { useForm, SubmitHandler } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

import Container from '@mui/material/Container'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { formatMoneyPtBR } from '@/ultis/formatMoneyPtBR'

import {
  ClientInfor,
  ClientResponseType,
  Kit,
  Service,
  // ServiceSchedulesListProps,
  TechnicalConsultant,
  Part,
  TypeBudget,
  ServiceTypeApi,
  PartTypeApi,
} from '@/types/budget'
import { ApiCore } from '@/lib/api'

import { useRouter } from 'next/router'

import List from '@mui/material/List'

import Stack from '@mui/material/Stack'

import {
  ButtonSubmit,
  DividerCard,
  InfoCardName,
  InfoCardText,
  ListItemCard,
  TitleCard,
} from './styles'

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
// import * as locale from 'date-fns/locale/pt-BR';
import IconButton from '@mui/material/IconButton'
import { Delete } from '@mui/icons-material'
import MenuItem from '@mui/material/MenuItem'
import { MoreOptionsButtonSelect } from '@/components/MoreOptionsButtonSelect'
import TextField from '@mui/material/TextField'
import ActionAlerts from '@/components/ActionAlerts'
import { ActionAlertsStateProps } from '@/components/ActionAlerts/ActionAlerts'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb'
import { listBreadcrumb } from '@/components/HeaderBreadcrumb/types'

import { useQuery } from 'react-query'

import { CompanyContext } from '@/contexts/CompanyContext'

import ModalSearchClientVehicle from './components/ModalSearchClientVehicle'
import ModalSearchClient from './components/ModalSearchClient'
import { ClientVehicleResponseType } from './components/ModalSearchClientVehicle/type'
import {
  Box,
  Button,
  InputAdornment,
  ListItem,
  OutlinedInput,
  Typography,
} from '@mui/material'
import ModalCreateKit from './components/ModalCreateKit'
import ModalCreateService from './components/ModalCreateService'
import ModalCreatePart from './components/ModalCreatePart'
import { DateInput } from '@/components/DateInput'
import { formatCNPJAndCPF } from '@/ultis/formatCNPJAndCPF'
// import ModalSearchClaimService from './components/ModalSearchClaimService'

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
  os_type_id: number | undefined
  maintenance_review_id: number
  consultant_id: number | undefined | null
  mandatory_itens: any[]
  quotation_itens: any[]
  technical_consultant_id: number | undefined
  client_id: number | undefined
  client_vehicle_id: number | undefined
  company_id: string | undefined
  // chasis: string | undefined
  claim_services: any[]
}

const HeaderBreadcrumbData: listBreadcrumb[] = [
  {
    label: 'Tunap',
    href: '/company',
  },
  {
    label: 'Edição de orçamento',
    href: '/budget/edit',
  },
]

export default function ServiceBudgetCreate() {
  const [client, setClient] = useState<ClientInfor | null>()
  const [clientVehicle, setClientVehicle] =
    useState<ClientVehicleResponseType | null>()
  const [kit, SetKit] = useState<Kit[]>([])
  const [service, SetService] = useState<ServiceTypeApi[]>([])
  const [serviceList, SetServiceList] = useState<Service[]>([])

  const [part, SetPart] = useState<PartTypeApi[]>([])
  const [partList, SetPartList] = useState<Part[]>([])

  const [budgetDate, setBudgetDate] = useState<Dayjs | null>(dayjs(new Date()))
  const [textFieldValue, setTextFieldValue] = useState('')
  const [complaint, setComplaint] = useState<string[]>([])
  const [technicalConsultant, setTechnicalConsultant] =
    useState<TechnicalConsultant | null>({
      id: 0,
      name: '-',
    })
  const [typeBudget, setTypeBudget] = useState<TypeBudget | null>({
    id: 0,
    name: '-',
  })

  const [technicalConsultantsList, setTechnicalConsultantsList] = useState<
    TechnicalConsultant[]
  >([])
  const [typeBudgetList, setTypeBudgetList] = useState<TypeBudget[]>([])
  const [isEditSelectedCard, setIsEditSelectedCard] =
    useState<isEditSelectedCardType>(null)
  const [wasEdited, setWasEdited] = useState(false)

  const [actionAlerts, setActionAlerts] =
    useState<ActionAlertsStateProps | null>(null)
  const [openModalClientSearch, setOpenModalClientSearch] = useState(false)
  const [openModalCreateKit, setOpenModalCreateKit] = useState(false)
  const [openModalCreateService, setOpenModalCreateService] = useState(false)
  const [openModalCreatePart, setOpenModalCreatePart] = useState(false)

  const [openModalClientVehicleSearch, setOpenModalClientVehicleSearch] =
    useState(false)
  // const [openModalClaimServiceSearch, setOpenModalClaimServiceSearch] =
  //   useState(false)

  const router = useRouter()

  const { companySelected } = useContext(CompanyContext)

  function handleDateSchedule(data: Dayjs | null) {
    setBudgetDate(data)
  }
  function handleTechnicalConsultant(id: number) {
    setTechnicalConsultant((prevState) => {
      return technicalConsultantsList.filter((c) => c.id === id)[0]
    })
  }
  function handleTypeBudget(id: number) {
    setTypeBudget((prevState) => {
      console.log(typeBudgetList)

      return typeBudgetList.filter((c) => c.id === id)[0]
    })
  }
  function handleCloseModalClienteSearch() {
    setOpenModalClientSearch(false)
  }
  function handleCloseModalClientVehicleSearch() {
    setOpenModalClientVehicleSearch(false)
  }
  function handleCloseModalCreateKit() {
    setOpenModalCreateKit(false)
  }
  function handleCloseModalCreateService() {
    setOpenModalCreateService(false)
  }
  function handleCloseModalCreatePart() {
    setOpenModalCreatePart(false)
  }
  // function handleCloseModalClaimServiceVehicleSearch() {
  //   setOpenModalClaimServiceSearch(false)
  // }

  function handleIsEditSelectedCard(value: isEditSelectedCardType) {
    setIsEditSelectedCard(value)
    setWasEdited(true)
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
  const handleTextFieldChange = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setTextFieldValue(event.target.value)
  }
  function addComplaint() {
    setComplaint((complaint) => [...complaint, textFieldValue])
  }
  function removeComplaint(value: number) {
    const updatedArray = [...complaint]
    updatedArray.splice(value, 1)
    setComplaint(updatedArray)
  }

  async function getMaintenanceReviewId() {
    try {
      const result = await api.get(
        `https://tunapconnect-api.herokuapp.com/api/maintenance-review?company_id=${companySelected}`,
      )
      return result.data.data[0].id
    } catch (error) {
      console.log(error)
    }
  }
  async function getClaims() {
    try {
      const result = await api.get(
        `https://tunapconnect-api.herokuapp.com/api/claim-service?company_id=${companySelected}`,
      )
      return result.data.data
    } catch (error) {}
  }

  async function onSave() {
    console.log(service)
    const dataFormatted: updateData = {
      company_id: `${companySelected}`,
      client_vehicle_id: clientVehicle?.id,
      client_id: client?.id,
      os_type_id: typeBudget?.id,
      maintenance_review_id: await getMaintenanceReviewId(),
      consultant_id: null,
      mandatory_itens: [],
      quotation_itens: [service, part],
      claim_services: await getClaims(),
      technical_consultant_id: technicalConsultant?.id,
    }
    console.log(dataFormatted)
    try {
      const respCreate: any = await api.create(
        'https://tunapconnect-api.herokuapp.com/api/quotations',
        dataFormatted,
      )

      const idCreatedResponse = respCreate.data.data.id

      router.push('/budget/' + idCreatedResponse)

      setIsEditSelectedCard(null)
      setActionAlerts({
        isOpen: true,
        title: `${respCreate.data.msg ?? 'Salvo com sucesso!'}!`,
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

  function handleAddClient(client: ClientResponseType) {
    console.log(client)
    setClient({
      id: client.id,
      name: client.name ?? 'Não informado',
      document: client.document ?? 'Não informado',
      email: client.email ?? ['Não informado'],
      phone: client.phone ?? ['Não informado'],
      address: client.address ?? ['Não informado'],
    })
  }
  function handleAddClientVehicle(client_vehicle: ClientVehicleResponseType) {
    setClientVehicle(null)
    setClientVehicle(client_vehicle)
    // setClientVehicle({
    //   id: client_vehicle.id,
    //   brand: client_vehicle?.vehicle?.model?.brand?.name ?? 'Não informado',
    //   chassis: client_vehicle?.chasis ?? 'Não informado',
    //   vehicle: client_vehicle?.vehicle?.name ?? 'Não informado',
    //   model:
    //     `${client_vehicle?.vehicle?.model?.name} - ${client_vehicle.vehicle.model_year}` ??
    //     'Não informado',
    //   color: client_vehicle?.color ?? 'Não informado',
    //   plate: client_vehicle?.plate ?? 'Não informado',
    // })
  }

  function handleAddService(newService: Service) {
    SetService((service) => [
      ...service,
      {
        service_id: newService.id,
        products_id: null,
        price: newService.standard_value ?? '0',
        price_discount: newService.price_discount.toString() ?? '0',
        quantity: newService.quantity.toString() ?? '0',
      },
    ])
    SetServiceList((prevState) => [...prevState, newService])
  }

  function handleAddPart(newPart: Part) {
    SetPart((part) => [
      ...part,
      {
        service_id: null,
        products_id: newPart.id,
        price: newPart.sale_value ?? '0',
        price_discount: newPart.price_discount.toString() ?? '0',
        quantity: newPart.quantity.toString() ?? '0',
      },
    ])
    SetPartList((prevState) => [...prevState, newPart])
  }

  function removeTotals(array: any, value: number) {
    const updatedArray = [...array]
    updatedArray.splice(value, 1)
    switch (array) {
      case kit:
        SetKit(updatedArray)
        break
      case service:
        SetService(updatedArray)
        break
      case part:
        SetPart(updatedArray)
        break
    }
  }
  function totalValueItems() {
    const totalTotalPart = part.reduce(
      (accumulator, part) => accumulator + (parseInt(part.price) || 0),
      0,
    )

    return totalTotalPart
  }
  function descontosValueItems() {
    const descontoTotalPart = part.reduce(
      (accumulator, part) => accumulator + (parseInt(part.price_discount) || 0),
      0,
    )

    return descontoTotalPart
  }
  function totalValueService() {
    const totalTotalService = service.reduce(
      (accumulator, service) => accumulator + (parseInt(service.price) || 0),
      0,
    )

    return totalTotalService
  }
  function descontosValueService() {
    const descontoTotalService = service.reduce(
      (accumulator, service) =>
        accumulator + (parseInt(service.price_discount) || 0),
      0,
    )

    return descontoTotalService
  }
  function descontosValueTotal() {
    const descontoTotalService = service.reduce(
      (accumulator, service) =>
        accumulator + (parseInt(service.price_discount) || 0),
      0,
    )
    const descontoTotalPart = part.reduce(
      (accumulator, part) => accumulator + (parseInt(part.price_discount) || 0),
      0,
    )
    return descontoTotalService + descontoTotalPart
  }
  function totalValue() {
    const totalTotalPart = part.reduce(
      (accumulator, part) =>
        accumulator +
        (parseInt(part.price) - parseInt(part.price_discount) || 0),
      0,
    )
    const totalTotalService = service.reduce(
      (accumulator, service) =>
        accumulator +
        (parseInt(service.price) - parseInt(service.price_discount) || 0),
      0,
    )

    return totalTotalPart + totalTotalService
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
        `https://tunapconnect-api.herokuapp.com/api/technical-consultant?company_id=${companySelected}`,
      )
      return resp.data.data
    },
    { enabled: !!companySelected },
  )
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

  const { data: dataTypeBudgetList, status: dataTypeBudgetListStatus } =
    useQuery<TypeBudget[]>(
      ['service_schedule', 'by_id', 'edit', 'data-type-budget-list', 'options'],
      async () => {
        const resp = await api.get(
          `https://tunapconnect-api.herokuapp.com/api/os?company_id=${companySelected}`,
        )
        console.log(resp.data.data)

        return resp.data.data
      },
      { enabled: !!companySelected },
    )
  useEffect(() => {
    console.log(dataTypeBudgetList)
    if (dataTypeBudgetListStatus === 'success') {
      setTypeBudgetList(
        dataTypeBudgetList.map((item: TypeBudget) => ({
          id: item.id,
          name: item.name,
        })),
      )
    }
  }, [dataTypeBudgetListStatus, dataTypeBudgetList])

  // useEffect(() => {
  //   if (dataServiceScheduleStatus === 'success') {
  //     const { client, client_vehicle, technical_consultant, promised_date } =
  //       dataServiceSchedule
  //     setClient({
  //       id: client.id,
  //       name: client.name ?? 'Não informado',
  //       cpf: client.document ?? 'Não informado',
  //       email: client.email ?? 'Não informado',
  //       telefone: client.phone ?? 'Não informado',
  //       address: client.address ?? 'Não informado',
  //     })

  //     setClientVehicle({
  //       id: client_vehicle.id,
  //       brand: client_vehicle?.vehicle?.model?.brand?.name ?? 'Não informado',
  //       chassis: client_vehicle?.chasis ?? 'Não informado',
  //       vehicle: client_vehicle?.vehicle?.name ?? 'Não informado',
  //       model:
  //         `${client_vehicle?.vehicle?.model?.name} - ${client_vehicle.vehicle.model_year}` ??
  //         'Não informado',
  //       color: client_vehicle?.color ?? 'Não informado',
  //       plate: client_vehicle?.plate ?? 'Não informado',
  //     })
  //     const promisedDate = dayjs(new Date(promised_date))
  //     setVisitDate(promisedDate)

  //     setTechnicalConsultant({
  //       id: technical_consultant?.id ?? 'Não informado',
  //       name: technical_consultant?.name ?? 'Não informado',
  //     })
  //   }
  // }, [dataServiceScheduleStatus, dataServiceSchedule])

  useEffect(() => {
    localStorage.removeItem('service-budget-list')
  }, [])

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <HeaderBreadcrumb data={HeaderBreadcrumbData} title="Orçamentos" />
          </Grid>
          <Grid item xs={12} md={7} lg={7}>
            <Stack spacing={3}>
              {/* Resumo */}

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
                  <TitleCard>Resumo do orçamento</TitleCard>
                </Stack>
                <DividerCard />

                <div style={{ display: 'flex', width: '100%' }}>
                  <Grid style={{ width: '50%' }}>
                    <List dense={false} style={{ rowGap: '30px' }}>
                      <Stack
                        style={{
                          backgroundColor: 'rgba(197, 203, 208, 1)',
                          padding: '14px 6px',
                        }}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: '700', color: '#606060' }}
                        >
                          Descrição
                        </Typography>
                      </Stack>
                      <Stack
                        style={{
                          paddingTop: '20px',
                          rowGap: '30px',
                          fontSize: '20px',
                        }}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: '700' }}
                        >
                          Valor dos itens:
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: '700' }}
                        >
                          Descontos nos itens:
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: '700' }}
                        >
                          Valor dos Serviços:
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: '700' }}
                        >
                          Desconto nos Serviços:
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: '700' }}
                        >
                          Total de descontos:
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: '700' }}
                        >
                          Total líquido:
                        </Typography>
                      </Stack>
                    </List>
                  </Grid>
                  <Grid style={{ width: '50%' }}>
                    <List dense={false}>
                      <Stack
                        style={{
                          backgroundColor: 'rgba(197, 203, 208, 1)',
                          padding: '14px 6px',
                        }}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: '700', color: '#606060' }}
                        >
                          Preço
                        </Typography>
                      </Stack>
                      <Stack
                        style={{
                          paddingTop: '20px',
                          rowGap: '30px',
                          fontSize: '20px',
                        }}
                      >
                        <Typography
                          variant="body1"
                          style={{ color: '#1C4961' }}
                        >
                          {formatMoneyPtBR(totalValueItems())}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ color: '#FF0057' }}
                        >
                          {formatMoneyPtBR(descontosValueItems())}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ color: '#1C4961' }}
                        >
                          {formatMoneyPtBR(totalValueService())}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ color: '#FF0057' }}
                        >
                          {formatMoneyPtBR(descontosValueService())}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ color: '#FF0057' }}
                        >
                          {formatMoneyPtBR(descontosValueTotal())}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ color: '#1C4961' }}
                        >
                          {formatMoneyPtBR(totalValue())}
                        </Typography>
                      </Stack>
                    </List>
                  </Grid>
                </div>
              </Paper>
              {/* Orçamento */}

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
                  <TitleCard>ORÇAMENTO</TitleCard>
                  <MoreOptionsButtonSelect
                    handleIsEditSelectedCard={handleIsEditSelectedCard}
                    typeEdit="budget"
                  />
                </Stack>
                <DividerCard />
                <List dense={false}>
                  <Box
                    display={'flex'}
                    paddingBottom={'24px'}
                    alignItems={'center'}
                  >
                    <Typography style={{ fontWeight: '900' }}>
                      Data da emissão:
                    </Typography>
                    <DateInput
                      dateSchedule={budgetDate}
                      handleDateSchedule={handleDateSchedule}
                      disabled={false}
                    ></DateInput>
                  </Box>
                  <Box display={'flex'} alignItems={'center'}>
                    <Typography style={{ fontWeight: '900' }}>
                      Responsável:
                    </Typography>
                    <TextField
                      id="standard-select-currency"
                      select
                      sx={{
                        width: '50%',
                      }}
                      value={technicalConsultant?.id}
                      variant="standard"
                      onChange={(e) =>
                        handleTechnicalConsultant(parseInt(e.target.value))
                      }
                    >
                      <MenuItem value={technicalConsultant?.id}>
                        {'Selecione um Consultor'}
                      </MenuItem>
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
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    paddingTop={'24px'}
                  >
                    <Typography style={{ fontWeight: '900' }}>
                      Tipo de orçamento:
                    </Typography>
                    <TextField
                      id="standard-select-currency"
                      select
                      sx={{
                        width: '50%',
                      }}
                      value={typeBudget?.id}
                      variant="standard"
                      onChange={(e) =>
                        handleTypeBudget(parseInt(e.target.value))
                      }
                    >
                      <MenuItem value={typeBudget?.id}>
                        {'Selecione um Tipo'}
                      </MenuItem>
                      {typeBudgetList.map((option) => (
                        <MenuItem
                          key={option.id + option.name}
                          value={option.id}
                        >
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </List>
              </Paper>
              {wasEdited && isEditSelectedCard === 'budget' && (
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
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={2}
                    >
                      <ButtonSubmit
                        variant="contained"
                        size="small"
                        onClick={() => handleCancelled()}
                      >
                        Ok
                      </ButtonSubmit>
                    </Stack>
                  </Paper>
                </Grid>
              )}
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
                </Stack>
                <DividerCard />
                {client ? (
                  <List dense={false}>
                    <ListItemCard alignItems="flex-start">
                      <InfoCardName>Nome:</InfoCardName>{' '}
                      <InfoCardText>
                        {client?.name ?? 'Não informado'}
                      </InfoCardText>
                    </ListItemCard>
                    <ListItemCard alignItems="flex-start">
                      <InfoCardName>CPF:</InfoCardName>{' '}
                      <InfoCardText>
                        {client?.document
                          ? formatCNPJAndCPF(client?.document)
                          : 'Não informado'}
                      </InfoCardText>
                    </ListItemCard>
                    {client?.phone && client?.phone.length > 0 ? (
                      client?.phone.map((phone: string, index: number) => (
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
                          {'Não informado'}
                        </InfoCardText>
                      </ListItemCard>
                    )}
                    {client?.email && client.email.length ? (
                      client?.email.map((email: string, index: number) => (
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
                          {'Não informado'}
                        </InfoCardText>
                      </ListItemCard>
                    )}
                    {client?.address && client?.address.length ? (
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
                          {'Não informado'}
                        </InfoCardText>
                      </ListItemCard>
                    )}
                  </List>
                ) : (
                  <Box
                    sx={{
                      with: '100%',
                      height: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                  >
                    <Stack
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      gap={1}
                      sx={{
                        py: 10,
                      }}
                      component="form"
                      // onSubmit={handleSubmitClient(onSubmitClient)}
                    >
                      <Typography variant="h6">Adicione um Cliente</Typography>

                      <OutlinedInput
                        id="outlined-adornment-weight"
                        size="small"
                        placeholder="Digite um nome"
                        onClick={() => {
                          setOpenModalClientSearch(true)
                        }}
                        onKeyUp={(e) => {
                          if (e.code === 'Enter') {
                            setOpenModalClientSearch(true)
                          }
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="sbumit seach client"
                              edge="end"
                              onClick={() => {
                                setOpenModalClientSearch(true)
                              }}
                            >
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        required
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />
                    </Stack>
                  </Box>
                )}
              </Paper>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5} lg={5}>
            <Stack spacing={2}>
              {/* RECLAMAÇÕES */}

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
                  <TitleCard>RECLAMAÇÕES</TitleCard>
                  <MoreOptionsButtonSelect
                    handleIsEditSelectedCard={handleIsEditSelectedCard}
                    typeEdit="complaintEdit"
                  />
                </Stack>
                <DividerCard />
                <List dense={false}>
                  {complaint?.map((key, index) => {
                    return (
                      <ListItemCard key={index} style={{ paddingBottom: '20' }}>
                        <Typography
                          style={{
                            fontWeight: '900',
                            maxWidth: '100%',
                            wordBreak: 'break-word',
                          }}
                        >
                          {key}
                        </Typography>
                        {wasEdited &&
                          isEditSelectedCard === 'complaintEdit' && (
                            <IconButton
                              aria-label="search"
                              color="warning"
                              onClick={() => removeComplaint(index)}
                              sx={{ marginLeft: 1, color: 'red' }}
                            >
                              <Delete />
                            </IconButton>
                          )}
                      </ListItemCard>
                    )
                  })}
                </List>
                <TextField
                  value={textFieldValue}
                  onChange={handleTextFieldChange}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter' && textFieldValue.length >= 1) {
                      addComplaint()
                    }
                  }}
                  placeholder="Reclamação..."
                ></TextField>
                <div
                  style={{
                    marginTop: '13px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    onClick={() => {
                      if (textFieldValue.length >= 1) return addComplaint()
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Enviar
                  </Button>
                </div>
              </Paper>
              {wasEdited && isEditSelectedCard === 'complaintEdit' && (
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
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={2}
                    >
                      <ButtonSubmit
                        variant="contained"
                        size="small"
                        onClick={() => handleCancelled()}
                      >
                        Ok
                      </ButtonSubmit>
                    </Stack>
                  </Paper>
                </Grid>
              )}
              {/* ITENS SELECIONADOS */}

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
                  <TitleCard>ITENS SELECIONADOS</TitleCard>
                </Stack>
                <DividerCard />

                <div
                  style={{
                    marginTop: '13px',
                    flexWrap: 'wrap',
                    rowGap: '20px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    columnGap: '10px',
                  }}
                >
                  <Button
                    onClick={() => setOpenModalCreateKit(true)}
                    variant="contained"
                    style={{ background: 'rgba(14, 148, 139, 1)' }}
                  >
                    + Kits
                  </Button>
                  <Button
                    onClick={() => setOpenModalCreateService(true)}
                    variant="contained"
                    style={{ background: 'rgba(14, 148, 139, 0.77)' }}
                  >
                    + Serviços
                  </Button>
                  <Button
                    onClick={() => setOpenModalCreatePart(true)}
                    variant="contained"
                    style={{ background: 'rgba(14, 148, 139, 1)' }}
                  >
                    + Peças
                  </Button>
                </div>
                <List dense={false}>
                  <Stack
                    style={{
                      backgroundColor: 'rgba(197, 203, 208, 1)',
                      padding: '14px 6px',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="body1" style={{ fontSize: '13px' }}>
                      Classificação Itens Qtd Desconto Preço Total ações
                    </Typography>
                  </Stack>
                  {serviceList?.map((key, index) => {
                    return (
                      <ListItem key={index} style={{ columnGap: '5px' }}>
                        <Typography
                          style={{ fontSize: '15px', fontWeight: '900' }}
                        >
                          {key.description}
                        </Typography>
                        <Typography
                          style={{ fontSize: '15px', fontWeight: '900' }}
                        >
                          {' '}
                          {key.tipo}
                        </Typography>
                        <Typography
                          style={{ fontSize: '15px', fontWeight: '900' }}
                        >
                          {key.quantity}
                        </Typography>
                        <Typography
                          style={{ fontSize: '15px', fontWeight: '900' }}
                        >
                          {formatMoneyPtBR(key.price_discount) || ''}
                        </Typography>
                        <Typography
                          style={{ fontSize: '15px', fontWeight: '900' }}
                        >
                          {formatMoneyPtBR(parseInt(key.standard_value)) || ''}
                        </Typography>
                        <Typography
                          style={{ fontSize: '15px', fontWeight: '900' }}
                        >
                          {formatMoneyPtBR(
                            parseInt(key.standard_value) - key.price_discount,
                          ) || ''}
                        </Typography>
                        <IconButton
                          aria-label="search"
                          color="warning"
                          onClick={() => removeTotals(service, index)}
                          sx={{ margin: 0, color: 'red', padding: 0 }}
                        >
                          <Delete />
                        </IconButton>
                      </ListItem>
                    )
                  })}
                  {partList?.map((key, index) => {
                    return (
                      <ListItem
                        key={index}
                        style={{ columnGap: '5px', maxWidth: '100%' }}
                      >
                        <Typography
                          style={{ fontSize: '15px', fontWeight: '900' }}
                        >
                          {key.name}
                        </Typography>
                        <Typography
                          style={{ fontSize: '15px', fontWeight: '900' }}
                        >
                          {' '}
                          {key.tipo}
                        </Typography>
                        <Typography
                          style={{ fontSize: '15px', fontWeight: '900' }}
                        >
                          {key.quantity}
                        </Typography>
                        <Typography
                          style={{ fontSize: '15px', fontWeight: '900' }}
                        >
                          {formatMoneyPtBR(key.price_discount) || ''}
                        </Typography>
                        <Typography
                          style={{ fontSize: '15px', fontWeight: '900' }}
                        >
                          {formatMoneyPtBR(parseInt(key.sale_value)) || ''}
                        </Typography>
                        <Typography
                          style={{ fontSize: '15px', fontWeight: '900' }}
                        >
                          {formatMoneyPtBR(
                            parseInt(key.sale_value) - key.price_discount,
                          ) || ''}
                        </Typography>
                        <IconButton
                          aria-label="search"
                          color="warning"
                          onClick={() => removeTotals(part, index)}
                          sx={{ margin: 0, color: 'red', padding: 0 }}
                        >
                          <Delete />
                        </IconButton>
                      </ListItem>
                    )
                  })}

                  <div></div>
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
                </Stack>
                <DividerCard />
                {clientVehicle ? (
                  <List dense={false}>
                    <ListItemCard>
                      <InfoCardName>Marca:</InfoCardName>{' '}
                      <InfoCardText>
                        {clientVehicle?.vehicle?.model?.brand?.name ??
                          'Não informado'}
                      </InfoCardText>
                    </ListItemCard>
                    <ListItemCard>
                      <InfoCardName>Modelo:</InfoCardName>{' '}
                      <InfoCardText>
                        {clientVehicle?.vehicle?.model?.name ?? 'Não informado'}{' '}
                        -{clientVehicle.vehicle.model_year ?? 'Não informado'}
                      </InfoCardText>
                    </ListItemCard>
                    <ListItemCard>
                      <InfoCardName>Veículo:</InfoCardName>{' '}
                      <InfoCardText>
                        {clientVehicle?.vehicle?.name ?? 'Não informado'}
                      </InfoCardText>
                    </ListItemCard>
                    <ListItemCard>
                      <InfoCardName>Cor:</InfoCardName>{' '}
                      <InfoCardText>
                        {clientVehicle?.color ?? 'Não informado'}
                      </InfoCardText>
                    </ListItemCard>
                    <ListItemCard>
                      <InfoCardName>Chassi:</InfoCardName>{' '}
                      <InfoCardText>
                        {clientVehicle?.chasis ?? 'Não informado'}
                      </InfoCardText>
                    </ListItemCard>
                    <ListItemCard>
                      <InfoCardName>Placa:</InfoCardName>{' '}
                      <InfoCardText>
                        {clientVehicle?.plate ?? 'Não informado'}
                      </InfoCardText>
                    </ListItemCard>
                    <ListItemCard>
                      <InfoCardName>KM:</InfoCardName>{' '}
                      <InfoCardText>
                        {clientVehicle?.mileage ?? 'Não informado'}
                      </InfoCardText>
                    </ListItemCard>
                  </List>
                ) : (
                  <Box
                    sx={{
                      with: '100%',
                      height: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                    }}
                  >
                    <Stack
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      gap={1}
                      sx={{
                        py: 10,
                      }}
                      // onSubmit={handleSubmitClientVehicle(
                      //   onSubmitClientVehicle,
                      // )}
                    >
                      <Typography variant="h6">Adicione um Veículo</Typography>

                      <OutlinedInput
                        id="outlined-adornment-weight"
                        size="small"
                        placeholder="Digite um nome"
                        onClick={() => {
                          setOpenModalClientVehicleSearch(true)
                        }}
                        onKeyUp={(e) => {
                          if (e.code === 'Enter') {
                            setOpenModalClientVehicleSearch(true)
                          }
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="search submit"
                              edge="end"
                              onClick={() =>
                                setOpenModalClientVehicleSearch(true)
                              }
                            >
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        required
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />
                    </Stack>
                  </Box>
                )}
              </Paper>
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
                      salvar
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
      </Container>
      <ModalSearchClient
        handleClose={handleCloseModalClienteSearch}
        openMolal={openModalClientSearch}
        handleAddClient={handleAddClient}
        dataClient={null}
      />
      <ModalSearchClientVehicle
        handleClose={handleCloseModalClientVehicleSearch}
        openMolal={openModalClientVehicleSearch}
        handleAddClientVehicle={handleAddClientVehicle}
        dataVehicleCreated={null}
      />
      <ModalCreateKit
        handleClose={handleCloseModalCreateKit}
        openMolal={openModalCreateKit}
        handleAddService={handleAddService}
        handleAddPart={handleAddPart}
      />
      <ModalCreateService
        handleClose={handleCloseModalCreateService}
        openMolal={openModalCreateService}
        handleAddService={handleAddService}
      />
      <ModalCreatePart
        handleClose={handleCloseModalCreatePart}
        openMolal={openModalCreatePart}
        handleAddPart={handleAddPart}
      />
      {/* <ModalSearchClaimService
        handleClose={handleCloseModalClaimServiceVehicleSearch}
        openMolal={openModalClaimServiceSearch}
        handleAddClaimService={handleAddClainServiceVehicle}
      /> */}
    </>
  )
}

ServiceBudgetCreate.auth = true
