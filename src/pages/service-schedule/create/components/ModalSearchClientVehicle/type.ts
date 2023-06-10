export interface Brand {
  id: number;
  company_id: number;
  name: string;
  active: boolean;
  code: string;
  image: any;
}

export interface Model {
  id: number;
  company_id: number;
  brand_id: number;
  name: string;
  active: boolean;
  image: any;
  integration_code: string;
  brand: Brand;
}

export interface Vehicle {
  id: number;
  company_id: number;
  model_id: number;
  name: string;
  model_year: string;
  active: boolean;
  brand_id: number;
  integration_code: string;
  model: Model;
}

export interface ClientVehicleResponseType {
  id: number;
  company_id: number;
  vehicle_id: number;
  chasis: string;
  color: string;
  number_motor: any;
  renavan: any;
  plate: string;
  mileage: string;
  vehicle: Vehicle;
}
