import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getStatistics() {
    return this.statisticsService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('summary')
  getStatisticsSummary() {
    return this.statisticsService.getStatisticsSummary();
  }
}
