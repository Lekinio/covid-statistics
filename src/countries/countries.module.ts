import { Module } from '@nestjs/common';

import { CountriesService } from './countries.service';
import { DatabaseModule } from '../database';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
