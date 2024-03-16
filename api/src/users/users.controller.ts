import { Controller, Get, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/typeorm/entities/User';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers(): Promise<User[]> {
    return this.usersService.fetchUsers();
  }
}
