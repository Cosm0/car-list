import { Vehicle } from 'src/typeorm/entities/Vehicle';
import { GetVehicleDto } from './vehicleDtos';

export function fromSingle(dbData: Vehicle): GetVehicleDto {
  const { id, brand, model, regNbr, vin, renter, latitude, longitude } = dbData;
  return {
    id,
    brand,
    model,
    registrationNumber: regNbr,
    vin,
    latitude,
    longitude,
    renter,
  };
}

export function fromMany(dbData: Vehicle[]) {
  return dbData.map((v) => fromSingle(v));
}
