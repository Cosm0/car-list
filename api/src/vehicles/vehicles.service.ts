import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Vehicle } from 'src/typeorm/entities/Vehicle';
import { CreateVehicleDto, UpdateVehicleDto } from './VehicleDtos';

@Injectable()
export class VehiclesService {
  constructor(@InjectRepository(Vehicle) private repo: Repository<Vehicle>) {}

  public fetchAll(): Promise<Vehicle[]> {
    return this.repo.find();
  }

  public fetchSingle(id: number): Promise<Vehicle> {
    return this.repo.findOne({ where: { id } });
  }

  public add(data: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.repo.create({ ...data });
    return this.repo.save(vehicle);
  }

  public edit(id: number, data: UpdateVehicleDto): Promise<UpdateResult> {
    return this.repo.update({ id }, { ...data });
  }

  public remove(id: number): Promise<DeleteResult> {
    return this.repo.delete({ id });
  }
}
