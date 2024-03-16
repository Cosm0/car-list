export type CreateVehicleDto = {
  brand: string;
  model: string;
  registrationNumber: string;
  vin: string;
  longitude: number;
  latitude: number;
};

export type UpdateVehicleDto = {
  brand?: string;
  model?: string;
  registrationNumber?: string;
  vin?: string;
  longitude?: number;
  latitude?: number;
};
