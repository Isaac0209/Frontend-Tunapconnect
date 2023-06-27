import { Dayjs } from 'dayjs'

export interface ServiceSchedulesListProps {
  id: number
  client: string
  plate: string
  chassis: string
  technical_consultant: string
  typeEstimate: string
  totalDiscount: number
  total: number
}

export interface ClientInfor {
  id: number
  name: string
  cpf: string
  telefone: string[]
  email: string[]
  address: string[]
}

export interface ClientResponseType {
  id: number
  company_id: number
  name: string
  document: string
  address: string[]
  active: boolean
  phone: any
  email: any
  fullName: string
}


export interface Service {
  length: any
  id: number
  company_id: number
  tipo: string
  service_code: string
  integration_code: string
  description: string
  standard_quantity: string
  standard_value: string
  active: boolean
  deleted_at: Date
  created_at: Date
  updated_at: Date
  price_discount: number
  quantity: number
}

export interface Part {
  length: any
  id: number
  company_id: number
  tipo: string
  product_code: string
  sale_value: string
  name: string
  tunap_code: string
  guarantee_value: string
  active: boolean
  created_at: Date
  updated_at: Date
  price_discount: number
  quantity: number
}
export interface Kit {
  kit_id: number
  name: string
  products: Part[]
  services: Service[]
}
export interface ClientVehicle {
  id: number
  brand: string
  model: string
  vehicle: string
  color: string
  chassis: string
  plate: string
}
export interface TechnicalConsultant {
  id: number
  name: string
}
export interface Budget {
  number: number
  date: Dayjs | null
  TechnicalConsultant: TechnicalConsultant | null
  typeBudget: string
}
// =================================================

export interface BrandType {
  id: number
  company_id: number
  name: string
  active: boolean
  code: string
  image: any
}
export interface ModelType {
  id: number
  company_id: number
  brand_id: number
  name: string
  active: boolean
  image: any
  integration_code: string
  brand: BrandType
}
export interface ClientType {
  id: number
  company_id: number
  name: string
  document: string
  address: string[]
  active: boolean
  phone: string[]
  email: string[]
  fullName: string
}

export interface TechnicalConsultantType {
  id: number
  company_id: number
  user_id: any
  active: boolean
  name: string
  integration_code: string
  user: any
}

export interface VehicleType {
  id: number
  company_id: number
  model_id: number
  name: string
  model_year: string
  active: boolean
  brand_id: number
  integration_code: string
  model: ModelType
}

export interface ClientVehicleType {
  id: number
  company_id: number
  vehicle_id: number
  chasis: string
  color: string
  number_motor: any
  renavan: any
  plate: string
  mileage: string
  vehicle: VehicleType
}

export interface ServiceScheduleType {
  id: number
  company_id: number
  technical_consultant_id: number
  client_id: number
  code: string
  chasis: any
  plate: any
  promised_date: string
  client_vehicle_id: number
  client_vehicle: ClientVehicleType
  client: ClientType
  technical_consultant: TechnicalConsultantType
  claims_service: any[]
}
