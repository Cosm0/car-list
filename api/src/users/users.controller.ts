import { Controller, Get, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetUserDto } from './usersDto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUsers(): Promise<GetUserDto[]> {
    return this.usersService.fetchUsers();
  }
}
