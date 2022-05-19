import {
  IsDateString,
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { allowedStatus } from 'src/entities/event-entity';

export class CreateEventDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(1, 1000)
  description: string;

  @IsOptional()
  @IsUrl()
  @Length(1, 255)
  imageUrl: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsNumberString()
  @IsIn(allowedStatus)
  status: number;

  @Length(1, 255)
  @IsString()
  adminKey: string;
}
