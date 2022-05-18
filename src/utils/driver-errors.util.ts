import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

enum driverErrorCodes {
  CONFLICT_ERROR = '23505',
}

export const throwDriverErrors = (code: string) => {
  if (code === driverErrorCodes.CONFLICT_ERROR) {
    throw new ConflictException(
      'Entered values already exists, please, check the fields and try again.',
    );
  } else {
    throw new InternalServerErrorException();
  }
};
