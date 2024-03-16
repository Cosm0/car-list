import { Controller, Get, UseGuards } from '@nestjs/common';

import { RentersService } from './renters.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetRenterDto } from './rentersDto';

@Controller('renters')
@UseGuards(JwtAuthGuard)
export class RentersController {
  constructor(private rentersService: RentersService) {}

  @Get()
  getUsers(): Promise<GetRenterDto[]> {
    return this.rentersService.fetchAll();
  }
}
