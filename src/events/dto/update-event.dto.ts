import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @Exclude()
  id: number;
}
