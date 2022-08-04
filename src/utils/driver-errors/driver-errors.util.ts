import { InternalServerErrorException } from '@nestjs/common';
import { driverErrorCodes } from './driver-errors-codes.data';

export function throwDriverErrors(code: string) {
  const driverError = driverErrorCodes.find((error) => error.code === code);

  if (driverError) {
    throw driverError.exception();
  } else {
    throw new InternalServerErrorException();
  }
}
