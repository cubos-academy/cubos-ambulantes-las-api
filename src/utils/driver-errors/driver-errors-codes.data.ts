import {
  BadRequestException,
  ConflictException,
  HttpException,
} from '@nestjs/common';

interface DriverErrorObject {
  code: string;
  name: string;
  exception: () => HttpException;
}

export const driverErrorCodes: DriverErrorObject[] = [
  {
    code: '23505',
    name: 'CONFLICT_ERROR',
    exception: () => {
      return new ConflictException(
        'Entered values already exists, please, check the fields and try again.',
      );
    },
  },
  {
    code: '23503',
    name: 'FOREIGN_KEY_VIOLATION',
    exception: () => {
      return new BadRequestException(
        'Check whether ids that you sent already exists',
      );
    },
  },
];
