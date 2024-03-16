import { Renter } from 'src/typeorm/entities/Renter';

export type CreateVehicleDto = {
  brand: string;
  model: string;
  registrationNumber: string;
  vin: string;
  renterId?: number;
};

export type UpdateVehicleDto = {
  brand?: string;
  model?: string;
  registrationNumber?: string;
  vin?: string;
  renterId?: number;
};

export type GetVehicleDto = {
  id: number;
  brand: string;
  model: string;
  registrationNumber: string;
  vin: string;
  renter?: Renter;
  longitude: number;
  latitude: number;
};
