import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'renters' })
export class Renter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  idNbr: string;

  @Column()
  address: string;

  @Column()
  email: string;
}
