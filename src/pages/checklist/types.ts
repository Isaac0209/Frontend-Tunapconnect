export interface Apointment {
  x_position: number;
  y_position: number;
  type: string;
}

export interface Image {
  id: number;
  name: string;
  url: string;
  size: string;
}

type ImageList = {
  [key: string]: {
    id: number;
    images: {
      id: number;
      name: string;
      url: string;
      size: string;
    }[];
  }[];
};
export interface Values {
  apointments: Apointment[];
  images: Image[];
}

type InpectionData = {
  name: string;
  url_image: string;
  screenShot?: string;
  value: {
    id: number;
    type: "amassado" | "riscado" | "quebrado" | "faltando" | "none";
    positions: {
      mobile: {
        top: number;
        left: number;
      };
      web: {
        top: number;
        left: number;
      };
    };
  }[];
  comment: string;
  images: {
    id: number;
    name: string;
    url: string;
    size: string;
  }[];
}[];

export interface Value {
  value: boolean | string;
  images?: ImageList[] | undefined | [];
  labels?: InpectionData;
  values?: Values | undefined;
  options?: string[] | undefined;
}

export interface Rule {
  required: boolean;
  type: string;
}

export interface Itens {
  name: string;
  comment?: string;
  Code?: string;
  rules: Rule;
  values: Value;
}

export interface Rules {
  required: boolean;
}

export interface Signature {
  name: string;
  rules: Rules;
  image: any[];
}

export interface StagesDataProps {
  name: string;
  itens: Itens[];
  status: "finalizado" | "rascunho" | "salvo";
  signatures?: Signature[] | undefined;
}

export interface ChecklistProps {
  id: number;
  name: string;
  description: string;
  active: boolean;
  stages: StagesDataProps[];
  created_at: Date;
  updated_at: Date;
}

export interface StageFormData {
  images: any;
  observation: string;
  inputs: boolean | string;
}

export interface Company {
  id: number;
  name: string;
  cnpj: any;
  cpf: string;
  country: any;
  city: any;
  province: any;
  address_1: any;
  address_2: any;
  integration_code: any;
  image: any[];
  corporate_name: any;
  address: any;
  phone: any;
  postal_code: any;
  email: any;
}

export interface Serviceschedule {
  id: number;
  company_id: number;
  technical_consultant_id: number;
  client_id: number;
  code: any;
  chasis: any;
  plate: any;
  promised_date: string;
  client_vehicle_id: number;
  status: any;
}

export interface ResponseGetCheckList {
  id: number;
  company_id: number;
  brand_id: number | null;
  vehicle_id: number | null;
  vehicle_client_id: number | null;
  client_id: number | null;
  checklist_model: number | null;
  km: any;
  fuel: any;
  stages: StagesDataProps[];
  created_at: string;
  updated_at: string;
  service_schedule_id: number;
  status: string;
  vehicle: any;
  client: any;
  brand: any;
  company: Company;
  serviceschedule: Serviceschedule;
}
