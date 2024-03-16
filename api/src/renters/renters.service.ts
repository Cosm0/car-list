import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Renter } from 'src/typeorm/entities/Renter';
import { Repository } from 'typeorm';
import { fromMany } from './getRentersFactory';
import { GetRenterDto } from './rentersDto';

@Injectable()
export class RentersService {
  constructor(
    @InjectRepository(Renter) private rentersRepo: Repository<Renter>,
  ) {}

  async fetchAll(): Promise<GetRenterDto[]> {
    const renters = await this.rentersRepo.find();
    return fromMany(renters);
  }
}
