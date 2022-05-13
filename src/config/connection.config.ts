import { DataSourceOptions } from 'typeorm';

export const connectionOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'covid_statistics',
  synchronize: true,
  // migrationsRun: true,
  migrations: []
};
