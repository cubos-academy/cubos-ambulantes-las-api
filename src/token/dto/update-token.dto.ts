import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateTokenDto {
  @ApiProperty({
    required: true,
    description: 'The most recent valid token from user',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUzNzQ4MzQ2LCJleHAiOjE2NTM3NjYzNDZ9.aO1gtg6wf_uCv-6k1i5N2uPJY0xBW01zZy45FEbqNuc',
    maxLength: 255,
    type: String,
  })
  @IsString()
  @Length(1, 255)
  hash: string;
}
