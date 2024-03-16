import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RentersController } from './renters.controller';
import { RentersService } from './renters.service';
import { Renter } from 'src/typeorm/entities/Renter';

@Module({
  controllers: [RentersController],
  providers: [RentersService],
  imports: [TypeOrmModule.forFeature([Renter])],
})
export class RentersModule {}
