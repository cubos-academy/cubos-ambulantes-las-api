import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNumberString, IsOptional, Length } from 'class-validator';

export class UpdateAddressDto {
  @Exclude()
  id: number;

  @ApiProperty({
    required: false,
    description: 'CEP of user with no simbols',
    example: '54420584',
    minLength: 8,
    maxLength: 10,
    type: String,
  })
  @IsOptional()
  @IsNumberString()
  @Length(8, 10)
  cep: string;

  @ApiProperty({
    required: false,
    description: 'Street name of user address',
    example: 'Rua josé alencar',
    maxLength: 150,
    type: String,
  })
  @IsOptional()
  @Length(1, 150)
  street: string;

  @ApiProperty({
    required: false,
    description: `Number of user house's`,
    example: 228,
    type: Number,
  })
  @IsOptional()
  @IsNumberString()
  number: number;

  @ApiProperty({
    required: false,
    description: 'Complement of user address',
    example: 'Bloco a Ap 220',
    maxLength: 50,
    type: String,
  })
  @IsOptional()
  @Length(1, 50)
  complement: string;

  @ApiProperty({
    required: false,
    description: 'District that user lives in',
    example: 'Bairro da madureira',
    maxLength: 80,
    type: String,
  })
  @IsOptional()
  @Length(1, 80)
  district: string;

  @ApiProperty({
    required: false,
    description: 'City that user lives in',
    example: 'Salvador',
    maxLength: 80,
    type: String,
  })
  @IsOptional()
  @Length(1, 80)
  city: string;

  @ApiProperty({
    required: false,
    description: 'Two initial letter of state that user lives in',
    example: 'BA',
    minLength: 2,
    maxLength: 2,
  })
  @IsOptional()
  @Length(2, 2)
  state: string;
}
