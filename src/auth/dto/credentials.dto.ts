import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString, Length } from 'class-validator';

export class CredentialsDto {
  @ApiProperty({
    description: 'CPF of an existing user',
    example: '13922947584',
    minLength: 11,
    maxLength: 11,
    type: String,
  })
  @IsNumberString()
  @Length(11, 11)
  cpf: string;

  @ApiProperty({
    description: 'Password of the user',
    example: '@ivsonemidio',
    maxLength: 255,
    type: String,
  })
  @Length(1, 255)
  @IsString()
  password: string;
}
