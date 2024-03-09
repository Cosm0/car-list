import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/typeorm/entities/User';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  fetchUsers() {
    // TODO: implement
    console.log('Fetching users...');
  }

  createUser() {
    // TODO: implement
    console.log('Posting users...');
  }
}
