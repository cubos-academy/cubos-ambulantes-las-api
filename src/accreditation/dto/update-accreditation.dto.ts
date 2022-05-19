import { PartialType } from '@nestjs/swagger';
import { CreateAccreditationDto } from './create-accreditation.dto';

export class UpdateAccreditationDto extends PartialType(
  CreateAccreditationDto,
) {}
