import { Injectable } from '@nestjs/common';

import { CountriesService } from '../countries';
import { StatisticsService } from './statistics.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class StatisticsScheduler {
  constructor(
    private readonly countryService: CountriesService,
    private readonly statisticsService: StatisticsService,
  ) {}

  @Cron('0 * * * *')
  async fetchAllDataByCountry() {
    const countries = await this.countryService.getAll();
    const countriesStatistics = countries.map(async (country) => {
      const { confirmed, recovered, deaths } =
        await this.statisticsService.fetchStatisticData(country.code);
      const statistics = await this.statisticsService.getStatisticsByCode(
        country.code,
      );
      const result = {
        confirmed,
        recovered,
        deaths,
        country,
      };
      await this.statisticsService.createOrUpdate(statistics?.id, result);
    });

    return Promise.all(countriesStatistics);
  }
}
