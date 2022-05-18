import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';
import { UserAddressEntity } from 'src/entities/user_address.entity';
import { UserContactsEntity } from 'src/entities/user_contacts.entity';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'Fullname of the user.',
    example: 'Irineu Feliciano Da Silva',
    minLength: 7,
    maxLength: 255,
    type: String,
  })
  @IsString()
  @Length(7, 255)
  fullName: string;

  @ApiProperty({
    required: false,
    maxLength: 50,
    description: 'User rg number and details',
    example: '123321 SSP BA',
    type: String,
  })
  @IsString()
  @IsOptional()
  @Length(1, 50)
  rg: string;

  @ApiProperty({
    required: true,
    description: '11 Digits CPF of the user',
    example: '13924758477',
    minLength: 11,
    maxLength: 11,
    type: String,
  })
  @IsNumberString()
  @Length(11, 11)
  cpf: string;

  @ApiProperty({
    required: true,
    description: 'Email of the user',
    example: 'quartofilho@gmail.com',
    maxLength: 255,
    type: String,
  })
  @IsEmail()
  @Length(1, 255)
  email: string;

  @ApiProperty({
    required: true,
    description: 'Password of the user',
    example: 'TheLightIs@EverythingThatExists',
    minLength: 7,
    maxLength: 255,
    type: String,
  })
  @IsString()
  @Length(7, 255)
  password: string;

  @ApiProperty({
    required: false,
    maxLength: 255,
    description: 'User profile image URL',
    example: 'http://imgur.com/coolImage223',
    type: String,
  })
  @IsUrl()
  @IsOptional()
  @Length(1, 255)
  profilePictureUrl: string;

  @ApiProperty({
    required: false,
    description: 'User birth date and time',
    example: '2000-03-27',
    type: Date,
  })
  @IsOptional()
  @IsDateString()
  birthDate: Date;

  @Exclude()
  @IsOptional()
  @IsDate()
  @Length(7, 255)
  createdAt: Date;

  @Exclude()
  address: UserAddressEntity;

  @Exclude()
  contacts: UserContactsEntity;
}
