import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatisticsEntity } from './statistics.entity';

@Entity('countries')
export class CountriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  en: string;

  @Column()
  ka: string;

  @Column()
  code: string;

  @OneToMany(() => StatisticsEntity, (statistics) => statistics.country)
  statistics: StatisticsEntity[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  UpdatedDate: Date;
}
