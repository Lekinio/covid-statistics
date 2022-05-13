import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CountriesEntity } from './countries.entity';

@Entity('statistics')
export class StatisticsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CountriesEntity, (country) => country.statistics)
  public country: CountriesEntity;

  @Column()
  confirmed: number;

  @Column()
  recovered: number;

  @Column()
  deaths: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  UpdatedDate: Date;
}
