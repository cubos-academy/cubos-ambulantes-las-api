import { IsIn, IsNumberString, IsString, Length } from 'class-validator';

export class CreateAccreditationDto {
  @IsString()
  @Length(1, 250)
  location: string;

  @IsNumberString()
  @IsIn([1, 2, 3])
  salesType: number;

  @IsNumberString()
  @IsIn([1, 2, 3])
  status: number;
}
