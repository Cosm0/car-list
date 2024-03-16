import { GetUserDto } from './usersDto';
import { User } from 'src/typeorm/entities/User';

export function fromSingle(dbData: User): GetUserDto {
  const { id, username } = dbData;
  return {
    id,
    username,
  };
}

export function fromMany(dbData: User[]) {
  return dbData.map((v) => fromSingle(v));
}
