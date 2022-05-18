import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNumberString, IsOptional, Length } from 'class-validator';

export class UpdateUserContactsDto {
  @Exclude()
  id: number;

  @ApiProperty({
    required: false,
    description: 'User email address',
    example: 'quartofilho@cubos.com',
    maxLength: 255,
    type: String,
  })
  @IsOptional()
  @IsEmail()
  @Length(1, 255)
  email: string;

  @ApiProperty({
    required: false,
    description: 'User phone',
    example: '40028922',
    minLength: 8,
    maxLength: 13,
    type: String,
  })
  @IsOptional()
  @IsNumberString()
  @Length(8, 13)
  phone: string;

  @ApiProperty({
    required: false,
    description: 'User mobile phone',
    example: '81981143555',
    minLength: 8,
    maxLength: 13,
    type: String,
  })
  @IsOptional()
  @IsNumberString()
  @Length(8, 13)
  mobilePhone: string;
}
