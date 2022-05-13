import { Injectable } from '@nestjs/common';

import axios from 'axios';

import { DataSource, Repository } from 'typeorm';
import { API_ENDPOINT } from '../config';
import { CountriesEntity } from '../database';
import { createCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountriesService {
  private readonly countryRepository: Repository<CountriesEntity>;

  constructor(private dataSource: DataSource) {
    this.countryRepository = dataSource.getRepository(CountriesEntity);
  }

  create(createCountryDto: createCountryDto): Promise<CountriesEntity> {
    return this.countryRepository.save(createCountryDto);
  }

  async getAll(): Promise<CountriesEntity[]> {
    return this.countryRepository.find({});
  }

  async fetchAndSaveCountry(): Promise<CountriesEntity> {
    const endpoint = API_ENDPOINT + 'countries';

    const countries = await axios.get(endpoint).then((x) => {
      return x.data.map((country) => {
        return { code: country.code, ...country.name };
      });
    });

    return this.create(countries);
  }
}
