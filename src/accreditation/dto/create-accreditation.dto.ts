import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateAccreditationDto {
  @ApiProperty({
    required: true,
    description: 'The id of event that user want to accredit',
    example: 1,
    type: Number,
  })
  @IsNumber()
  eventId: number;

  @ApiProperty({
    required: true,
    description: 'Ids of sales types that user want to accredit',
    example: [1, 2],
    type: Array,
  })
  @IsArray()
  @ArrayNotEmpty()
  salesType: number[];
}
