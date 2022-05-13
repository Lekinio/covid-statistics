import { PartialType } from '@nestjs/mapped-types';
import { CreateStatisticDto } from './create-statistic.dto';
import { IsNumber } from 'class-validator';

export class UpdateStatisticDto extends PartialType(CreateStatisticDto) {
  @IsNumber()
  confirmed: number;

  @IsNumber()
  recovered: number;

  @IsNumber()
  deaths: number;
}
