import { Controller, Get, Post } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    this.usersService.fetchUsers();
  }

  @Post()
  addUser() {
    this.usersService.createUser();
  }
}
