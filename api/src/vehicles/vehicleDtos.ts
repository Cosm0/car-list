import { IsNumber, IsOptional, IsString } from 'class-validator';

import { Renter } from 'src/typeorm/entities/Renter';

export class CreateVehicleDto {
  @IsString() brand: string;
  @IsString() model: string;
  @IsString() registrationNumber: string;
  @IsString() vin: string;
  @IsNumber() @IsOptional() renterId?: number;
}

export class UpdateVehicleDto {
  @IsString() @IsOptional() brand?: string;
  @IsString() @IsOptional() model?: string;
  @IsString() @IsOptional() registrationNumber?: string;
  @IsString() @IsOptional() vin?: string;
  @IsNumber() @IsOptional() renterId?: number;
}

export class GetVehicleDto {
  id: number;
  brand: string;
  model: string;
  registrationNumber: string;
  vin: string;
  renter?: Renter;
  longitude: number;
  latitude: number;
}
