import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Renter } from './Renter';

@Entity({ name: 'vehicles' })
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column({ unique: true })
  regNbr: string;

  @Column({ unique: true })
  vin: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @OneToOne(() => Renter, { nullable: true })
  @JoinColumn({})
  renter: Renter;
}
