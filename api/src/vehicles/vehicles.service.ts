import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { faker } from '@faker-js/faker';

import { Vehicle } from 'src/typeorm/entities/Vehicle';
import {
  CreateVehicleDto,
  GetVehicleDto,
  UpdateVehicleDto,
} from './vehicleDtos';
import { fromSingle, fromMany } from './getVehiclesFactory';
import { Renter } from 'src/typeorm/entities/Renter';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle) private vehiclesRepo: Repository<Vehicle>,
    @InjectRepository(Renter) private rentersRepo: Repository<Renter>,
  ) {}

  public async fetchAll(): Promise<GetVehicleDto[]> {
    const dbData = await this.vehiclesRepo.find();
    return fromMany(dbData);
  }

  public async fetchSingle(id: number): Promise<GetVehicleDto> {
    const dbData = await this.vehiclesRepo.findOne({ where: { id } });
    return fromSingle(dbData);
  }

  public async add(data: CreateVehicleDto): Promise<GetVehicleDto> {
    const { brand, model, registrationNumber, vin, renterId } = data;
    const renter = renterId
      ? await this.rentersRepo.findOne({ where: { id: renterId } })
      : null;
    const vehicle = this.vehiclesRepo.create({
      brand,
      model,
      regNbr: registrationNumber,
      renter,
      vin,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    });
    await this.vehiclesRepo.save(vehicle);
    return fromSingle(vehicle);
  }

  public async edit(id: number, data: UpdateVehicleDto): Promise<UpdateResult> {
    const { brand, model, registrationNumber, vin, renterId } = data;
    const renter = renterId
      ? await this.rentersRepo.findOne({ where: { id: renterId } })
      : null;
    const vehicle = this.vehiclesRepo.create({
      brand,
      model,
      regNbr: registrationNumber,
      renter,
      vin,
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    });
    return this.vehiclesRepo.update({ id }, { ...vehicle });
  }

  public remove(id: number): Promise<DeleteResult> {
    return this.vehiclesRepo.delete({ id });
  }
}
