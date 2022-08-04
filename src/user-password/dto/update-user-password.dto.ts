import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateUserPasswordDto {
  @ApiProperty({
    required: true,
    description: 'Old user password',
    example: 'TheL1feI2sJust4School',
    type: String,
    minLength: 7,
    maxLength: 255,
  })
  @IsString()
  @Length(7, 255)
  oldPassword: string;

  @ApiProperty({
    required: true,
    description: 'New password that user wants to use',
    example: 'TheD3athN0t3xists',
    type: String,
    minLength: 7,
    maxLength: 255,
  })
  @IsString()
  @Length(7, 255)
  newPassword: string;
}
