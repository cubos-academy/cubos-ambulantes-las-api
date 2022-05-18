import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString, Length } from 'class-validator';

export class CredentialsDto {
  @ApiProperty({
    description: 'CPF of the user',
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
    example: 'theLight7@Near',
    maxLength: 255,
    type: String,
  })
  @Length(1, 255)
  @IsString()
  password: string;
}
