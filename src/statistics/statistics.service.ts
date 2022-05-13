import { Injectable } from '@nestjs/common';

import axios from 'axios';
import { DataSource, Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

import { API_ENDPOINT } from '../config';
import { StatisticsEntity } from '../database';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { CreateStatisticDto } from './dto/create-statistic.dto';

@Injectable()
export class StatisticsService {
  private readonly statisticsRepository: Repository<StatisticsEntity>;

  constructor(private dataSource: DataSource) {
    this.statisticsRepository = dataSource.getRepository(StatisticsEntity);
  }

  async create(data: CreateStatisticDto): Promise<StatisticsEntity> {
    return this.statisticsRepository.save(data);
  }

  async update(id: number, data: UpdateStatisticDto): Promise<UpdateResult> {
    return this.statisticsRepository.update(id, data);
  }

  async createOrUpdate(id: number | null, data: CreateStatisticDto | UpdateStatisticDto) {
    return id ? this.update(id, data) : this.create(data);
  }

  async getAll(): Promise<StatisticsEntity[]> {
    return this.statisticsRepository.find({ relations: ['country'] });
  }

  async getStatisticsSummary() {
    return this.statisticsRepository
      .createQueryBuilder()
      .select('SUM(confirmed)', 'confirmed')
      .addSelect('SUM(deaths)', 'deaths')
      .addSelect('SUM(recovered)', 'recovered')
      .getRawOne();
  }

  async getStatisticsByCode(code: string): Promise<StatisticsEntity> {
    return this.statisticsRepository.findOne({
      relations: ['country'],
      where: { country: { code } }
    });
  }

  async fetchStatisticData(code) {
    const endpoint = API_ENDPOINT + 'get-country-statistics';

    return axios.post(endpoint, { code }).then((x) => x.data);
  }
}
