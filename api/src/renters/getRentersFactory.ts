import { GetRenterDto } from './rentersDto';
import { Renter } from 'src/typeorm/entities/Renter';

export function fromSingle(dbData: Renter): GetRenterDto {
  const { id, firstname, lastname, idNbr, address, email } = dbData;
  return {
    id,
    firstname,
    lastname,
    idNbr,
    address,
    email,
  };
}

export function fromMany(dbData: Renter[]) {
  return dbData.map((v) => fromSingle(v));
}
