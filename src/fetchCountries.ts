import { NestFactory } from '@nestjs/core';

import { CountriesService } from './countries';
import { CountriesModule } from './countries';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CountriesModule);
  const country = app.get<CountriesService>(CountriesService);
  await country.fetchAndSaveCountry();
  await app.close();
  process.exit(0);
}

bootstrap();
