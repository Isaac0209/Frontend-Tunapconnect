import * as React from 'react'
// import { useForm, SubmitHandler } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'

import Container from '@mui/material/Container'

import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { formatMoneyPtBR } from '@/ultis/formatMoneyPtBR'

import {
  ClientInfor,
  ClientResponseType,
  Kit,
  Service,
  ClientVehicle,
  // ServiceSchedulesListProps,
  TechnicalConsultant,
} from '@/types/budget'
import { ApiCore } from '@/lib/api'

import { useRouter } from 'next/router'

import List from '@mui/material/List'

import Stack from '@mui/material/Stack'

import {
  ButtonAdd,
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
import { formatDateTimeTimezone } from '@/ultis/formatDate'
import ActionAlerts from '@/components/ActionAlerts'
import { ActionAlertsStateProps } from '@/components/ActionAlerts/ActionAlerts'
import HeaderBreadcrumb from '@/components/HeaderBreadcrumb'
import { listBreadcrumb } from '@/components/HeaderBreadcrumb/types'

import { useQuery } from 'react-query'
import { formatCPF } from '@/ultis/formatCPF'
import { formatPlate } from '@/ultis/formatPlate'

import { CompanyContext } from '@/contexts/CompanyContext'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import ModalSearchClientVehicle from './components/ModalSearchClientVehicle'
import ModalSearchClient from './components/ModalSearchClient'
import { ClientVehicleResponseType } from './components/ModalSearchClientVehicle/type'
import { Box, Button, ListItem, ListItemText, Typography } from '@mui/material'
import ModalCreateKit from './components/ModalCreateKit'
import ModalCreateService from './components/ModalCreateService'
// import ModalSearchClaimService from './components/ModalSearchClaimService'

const api = new ApiCore()

type isEditSelectedCardType =
  | 'client'
  | 'clientVehicle'
  | 'complaintEdit'
  | 'technicalConsultant'
  | null

type updateData = {
  code: null
  promised_date: string
  technical_consultant_id: number | undefined
  client_id: number | undefined
  client_vehicle_id: number | undefined
  company_id: string | undefined
  // chasis: string | undefined
  plate: string | undefined
  claims_service: any[]
  checklist_version_id: number | undefined
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
  const [clientVehicle, setClientVehicle] = useState<ClientVehicle | null>()
  const [kit, SetKit] = useState<Kit | null>()
  const [service, SetService] = useState<Service | null>()
  const [totals, SetTotals] = useState<any[]>([])
  const [visitDate, setVisitDate] = useState<Dayjs | null>(dayjs(new Date()))
  const [textFieldValue, setTextFieldValue] = useState('')
  const [complaint, setComplaint] = useState<string[]>([]);
  const [technicalConsultant, setTechnicalConsultant] =
    useState<TechnicalConsultant | null>({
      id: 0,
      name: '-',
    })
  const [technicalConsultantsList, setTechnicalConsultantsList] = useState<
    TechnicalConsultant[]
  >([])
  const [isEditSelectedCard, setIsEditSelectedCard] =
    useState<isEditSelectedCardType>(null)
  const [wasEdited, setWasEdited] = useState(false)

  const [actionAlerts, setActionAlerts] =
    useState<ActionAlertsStateProps | null>(null)
  const [openModalClientSearch, setOpenModalClientSearch] = useState(false)
  const [openModalCreateKit, setOpenModalCreateKit] = useState(false)
  const [openModalCreateService, setOpenModalCreateService] = useState(false)

  const [openModalClientVehicleSearch, setOpenModalClientVehicleSearch] =
    useState(false)
  // const [openModalClaimServiceSearch, setOpenModalClaimServiceSearch] =
  //   useState(false)

  const router = useRouter()

  const { companySelected } = useContext(CompanyContext)

  function handleCloseModalClienteSearch() {
    setOpenModalClientSearch(false)
  }
  function handleCloseModalClientVehicleSearch() {
    setOpenModalClientVehicleSearch(false)
  }
  function handleCloseModalCreateKit(){
    setOpenModalCreateKit(false)
  }
  function handleCloseModalCreateService(){
    setOpenModalCreateService(false)
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
  const handleTextFieldChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setTextFieldValue(event.target.value);
  };
  function addComplaint(){
    setComplaint((complaint) => [...complaint, textFieldValue]);
  }
  function removeComplaint(value: number){
    const updatedArray = [...complaint];
    updatedArray.splice(value, 1);
    setComplaint(updatedArray);
  }

  async function onSave() {
    const dataFormatted: updateData = {
      code: null,
      promised_date: formatDateTimeTimezone(`${visitDate}`),
      technical_consultant_id: technicalConsultant?.id,
      client_id: client?.id,
      client_vehicle_id: clientVehicle?.id,
      company_id: `${companySelected}`,
      plate: clientVehicle?.plate,
      claims_service: [],
      checklist_version_id: 14,
    }
    console.log(dataFormatted)
    try {
      const respCreate: any = await api.create(
        '/service-schedule',
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
      cpf: client.document ?? 'Não informado',
      email: client.email ?? ['Não informado'],
      telefone: client.phone ?? ['Não informado'],
      address: client.address ?? ['Não informado'],
    })
  }
  function handleAddClientVehicle(client_vehicle: ClientVehicleResponseType) {
    setClientVehicle(null)
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
  }
  function handleAddKit(kit: Kit) {
    SetKit(null)
    SetKit({
      tipo: kit.tipo,
      descricao: kit.descricao ?? 'Não informado', 
      qtd: kit.qtd ?? '0',
      desconto: kit.desconto ?? '0',
      valor: kit.valor ?? '0',
      total: kit.total ?? '0'
    })
    addTotals(kit)
  }


  function handleAddService(service: Service) {
    SetService(null)
    SetService({
      tipo: service.tipo,
      descricao: service.descricao ?? 'Não informado', 
      qtd: service.qtd ?? '0',
      desconto: service.desconto ?? '0',
      valor: service.valor ?? '0',
      total: service.total ?? '0'
    })
    console.log(service)
    addTotals(service)
  }


  function addTotals(value: any){
    SetTotals((totals) => [...totals, value]);
   
  }
  // function handleAddClainServiceVehicle(client_vehicle: any) {
  //   console.log(client_vehicle)
  // setClientVehicle(null)
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
  // }

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
            <HeaderBreadcrumb
              data={HeaderBreadcrumbData}
              title="Orçamentos"
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
                  <ButtonAdd
                    aria-label="add to client"
                    onClick={() => setOpenModalClientSearch(true)}
                  >
                    <AddCircleIcon />
                  </ButtonAdd>
                </Stack>
                <DividerCard />
                <List dense={false}>
                  <ListItemCard alignItems="flex-start">
                    <InfoCardName>Nome:</InfoCardName>{' '}
                    {client?.name && (
                      <InfoCardText>{client?.name}</InfoCardText>
                    )}
                  </ListItemCard>
                  <ListItemCard alignItems="flex-start">
                    <InfoCardName>CPF:</InfoCardName>{' '}
                    {client?.cpf && (
                      <InfoCardText>{formatCPF(client?.cpf)}</InfoCardText>
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
                      <InfoCardText width="100%"></InfoCardText>
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
                      <InfoCardText width="100%"></InfoCardText>
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
                      <InfoCardText width="100%"></InfoCardText>
                    </ListItemCard>
                  )}
                </List>
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
                  {complaint?.map((option, index) => {
                      return  <ListItemCard style={{ paddingBottom: "20"}}><InfoCardName>{option}</InfoCardName>{wasEdited && isEditSelectedCard == "complaintEdit" && ( <IconButton
                        aria-label="search"
                        color="warning"
                        onClick={() => removeComplaint(index)}
                        sx={{ marginLeft: 1, color: 'red' }}
                      >
                        <Delete />
                      </IconButton>)}</ListItemCard>
                      })}
                  
                </List>
                <TextField value={textFieldValue} onChange={handleTextFieldChange} placeholder='Reclamação...'></TextField>
                <div style={{ marginTop: '13px', display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={() => addComplaint()} variant="contained" color="primary">
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
              
                <div style={{ marginTop: '13px', flexWrap: "wrap", rowGap: "20px", display: 'flex', justifyContent: 'flex-end', columnGap: "10px" }}>
                  <Button onClick={() => setOpenModalCreateKit(true)} variant="contained" style={{ background: "rgba(14, 148, 139, 1)"}}>
                  + Kits
                  </Button>
                  <Button onClick={() => setOpenModalCreateService(true)} variant="contained" style={{ background: "rgba(14, 148, 139, 0.77)"}}>
                  + Serviços
                  </Button>
                  <Button onClick={() => addComplaint()} variant="contained" style={{ background: "rgba(14, 148, 139, 1)"}}>
                  + Peças
                  </Button>
              </div>
              <List dense={false}>
                 <Stack style={{backgroundColor: "rgba(197, 203, 208, 1)", padding: "14px 6px", textAlign: 'center'}}>
                  <Typography variant="body1" style={{fontSize: "13px"}}>Classificação Itens Qtd Preço Desconto Unitário Total ações</Typography >
                 </Stack>
                 {totals?.map((option, index) => {
                    return <ListItem style={{columnGap: '20px'}}>
                    <ListItemText style={{fontSize: "13px", fontWeight: '900'}}>{option.descricao}</ListItemText>
                    <ListItemText style={{fontSize: "13px", fontWeight: '900'}}>{option.tipo + (index + 1)} </ListItemText>
                    <ListItemText style={{fontSize: "13px", fontWeight: '900'}}>{option.qtd}</ListItemText>
                    <ListItemText style={{fontSize: "13px", fontWeight: '900'}}>{formatMoneyPtBR(option.desconto) || ''}</ListItemText>
                    <ListItemText style={{fontSize: "13px", fontWeight: '900'}}>{formatMoneyPtBR(option.valor) || ''}</ListItemText>
                    <ListItemText style={{fontSize: "13px", fontWeight: '900'}}>{formatMoneyPtBR(option.total) || ''}</ListItemText>

                  </ListItem>
                 })}
                  

                 <div>

                 </div>
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
                  <ButtonAdd
                    aria-label="add to client"
                    onClick={() => {
                      setOpenModalClientVehicleSearch(true)
                    }}
                  >
                    <AddCircleIcon />
                  </ButtonAdd>
                </Stack>
                <DividerCard />
                <List dense={false}>
                  <ListItemCard>
                    <InfoCardName>Marca:</InfoCardName>{' '}
                    {clientVehicle?.brand ? (
                      <InfoCardText>{clientVehicle?.brand}</InfoCardText>
                    ) : (
                      <InfoCardText width="100%"></InfoCardText>
                    )}
                  </ListItemCard>
                  <ListItemCard>
                    <InfoCardName>Modelo:</InfoCardName>{' '}
                    {clientVehicle?.model ? (
                      <InfoCardText>{clientVehicle?.model}</InfoCardText>
                    ) : (
                      <InfoCardText width="100%"></InfoCardText>
                    )}
                  </ListItemCard>
                  <ListItemCard>
                    <InfoCardName>Veículo:</InfoCardName>{' '}
                    {clientVehicle?.vehicle ? (
                      <InfoCardText>{clientVehicle?.vehicle}</InfoCardText>
                    ) : (
                      <InfoCardText width="100%"></InfoCardText>
                    )}
                  </ListItemCard>
                  <ListItemCard>
                    <InfoCardName>Cor:</InfoCardName>{' '}
                    {clientVehicle?.color ? (
                      <InfoCardText>{clientVehicle?.color}</InfoCardText>
                    ) : (
                      <InfoCardText width="100%"></InfoCardText>
                    )}
                  </ListItemCard>
                  <ListItemCard>
                    <InfoCardName>Chassi:</InfoCardName>{' '}
                    {clientVehicle?.chassis ? (
                      <InfoCardText>{clientVehicle?.chassis}</InfoCardText>
                    ) : (
                      <InfoCardText width="100%"></InfoCardText>
                    )}
                  </ListItemCard>
                  <ListItemCard>
                    <InfoCardName>Placa:</InfoCardName>{' '}
                    {clientVehicle?.plate ? (
                      <InfoCardText>
                        {formatPlate(clientVehicle?.plate)}
                      </InfoCardText>
                    ) : (
                      <InfoCardText width="100%"></InfoCardText>
                    )}
                  </ListItemCard>
                </List>
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
      />
      <ModalSearchClientVehicle
        handleClose={handleCloseModalClientVehicleSearch}
        openMolal={openModalClientVehicleSearch}
        handleAddClientVehicle={handleAddClientVehicle}
      />
       <ModalCreateKit
        handleClose={handleCloseModalCreateKit}
        openMolal={openModalCreateKit}
        handleAddKit={handleAddKit}
      />
      <ModalCreateService
        handleClose={handleCloseModalCreateService}
        openMolal={openModalCreateService}
        handleAddService={handleAddService}
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
