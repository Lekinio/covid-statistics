import {
  getRepositoryToken,
  getConnectionToken,
  TypeOrmModule
} from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Provider } from '@nestjs/common';
import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { StatisticsService } from '../statistics.service';
import { StatisticsEntity, CountriesEntity } from '../../database';

describe('StatisticsController', () => {
  let statisticsService: StatisticsService;
  let statisticsRepository: Repository<StatisticsEntity>;
  let countriesRepository: Repository<CountriesEntity>;
  let dbConnection;

  const statistic = {
    confirmed: 100,
    recovered: 80,
    deaths: 20,
    createdDate: new Date(),
    UpdatedDate: new Date()
  };
  const prepareDatabase = async (): Promise<void> => {
    const country = await countriesRepository.save(
      countriesRepository.create({
        en: 'Georgia',
        ka: 'საქართველო',
        code: 'Test',
        createdDate: new Date(),
        UpdatedDate: new Date()
      } as CountriesEntity)
    );

    await statisticsRepository.save(
      statisticsRepository.create({
        ...statistic,
        country: country
      } as StatisticsEntity)
    );
  };

  beforeAll(async () => {
    const connectionOptionsForTesting: DataSourceOptions = {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'rootroot',
      database: 'covid_statistics_test',
      synchronize: true
    };

    const databaseProviders: Provider[] = [
      {
        provide: DataSource,
        useFactory: async () => {
          const dataSource = new DataSource({
            ...connectionOptionsForTesting,
            entities: [CountriesEntity, StatisticsEntity]
          });
          return await dataSource.initialize();
        }
      }
    ];

    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot()],
      providers: [StatisticsService, ...databaseProviders]
    }).compile();

    statisticsService = module.get<StatisticsService>(StatisticsService);
    statisticsRepository = module.get(getRepositoryToken(StatisticsEntity));
    dbConnection = module.get(getConnectionToken());
  });

  beforeEach(async () => {
    await dbConnection.query(`TRUNCATE statistics CASCADE`);
    await prepareDatabase();
  });

  it('should get all statistics', async () => {
    const result = statisticsService.getAll();
    console.log(result);

    expect(result).toEqual([statistic]); // check this
  });
});
