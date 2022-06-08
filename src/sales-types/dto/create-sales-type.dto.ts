import { IsOptional, IsString, Length } from 'class-validator';

export class CreateSalesTypeDto {
  @Length(4, 255)
  @IsString()
  name: string;

  @IsOptional()
  @Length(10, 500)
  @IsString()
  description: string;

  @Length(1, 255)
  @IsString()
  adminKey: string;
}
