import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { VehiclesService } from './vehicles.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import {
  CreateVehicleDto,
  GetVehicleDto,
  UpdateVehicleDto,
} from './vehicleDtos';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(): Promise<GetVehicleDto[]> {
    return this.vehiclesService.fetchAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getSingle(@Param('id', ParseIntPipe) id: number): Promise<GetVehicleDto> {
    return this.vehiclesService.fetchSingle(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  add(@Body() data: CreateVehicleDto): Promise<GetVehicleDto> {
    return this.vehiclesService.add(data);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateVehicleDto,
  ): Promise<UpdateResult> {
    return this.vehiclesService.edit(id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.vehiclesService.remove(id);
  }
}
