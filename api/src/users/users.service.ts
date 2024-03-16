import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/typeorm/entities/User';
import { GetUserDto } from './usersDto';
import { fromMany } from './getUsersFactory';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async fetchUsers(): Promise<GetUserDto[]> {
    const users = await this.usersRepo.find();
    return fromMany(users);
  }
}
