export interface ServiceSchedulesListProps {
  id: number;
  client: string;
  plate: string;
  chassis: string;
  technical_consultant: string;
  typeEstimate: string;
  totalDiscount: number;
  total: number;
}

export interface ClientInfor {
  id: number;
  name: string;
  cpf: string;
  telefone: string[];
  email: string[];
  address: string[];
}

export interface ClientVehicle {
  id: number;
  brand: string;
  model: string;
  vehicle: string;
  color: string;
  chassis: string;
  plate: string;
}
export interface TechnicalConsultant {
  id: number;
  name: string;
}
