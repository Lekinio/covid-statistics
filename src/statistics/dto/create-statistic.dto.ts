import { IsNumber } from 'class-validator';

export class CreateStatisticDto {
  @IsNumber()
  confirmed: number;

  @IsNumber()
  recovered: number;

  @IsNumber()
  deaths: number;
}
