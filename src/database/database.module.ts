import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';

import { DataSource } from 'typeorm';
import { connectionOptions } from '../config';
import { CountriesEntity, StatisticsEntity, UsersEntity } from './entities';

export const databaseProviders: Provider[] = [
  {
    provide: DataSource,
    useFactory: async () => {
      const dataSource = new DataSource({
        ...connectionOptions,
        entities: [CountriesEntity, StatisticsEntity, UsersEntity],
      });
      return await dataSource.initialize();
    },
  },
];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
