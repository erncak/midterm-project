// create-house.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class CreateHouseDto {
  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @IsDate()
  readonly from: Date;

  @IsDate()
  readonly to: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly numOfPeople: number;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly amenities: string;

  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly available: boolean;
}
