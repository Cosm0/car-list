import { Renter } from "./renter.model";

export class Vehicle {
  id: number;
  brand: string;
  model: string;
  registrationNumber: string;
  vin: string;
  renter?: Renter;
  longitude: number;
  latitude: number;
}
