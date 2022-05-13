import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { DatabaseModule } from '../database';
import { StatisticsScheduler } from './statistics.scheduler';
import { CountriesModule } from '../countries';

@Module({
  imports: [ScheduleModule.forRoot(), DatabaseModule, CountriesModule],
  controllers: [StatisticsController],
  providers: [StatisticsService, StatisticsScheduler]
})
export class StatisticsModule {
}
