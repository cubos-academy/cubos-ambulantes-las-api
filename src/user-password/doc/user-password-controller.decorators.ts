import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  userPasswordUnauthorizedSchema,
  userPasswordOkSchema,
} from './user-password.schema';

export const userPasswordControllerDecorators = {
  update: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Update user password',
        description: 'With this endpoint you can update a user password',
      }),
      ApiOkResponse({
        description: 'Successfully updated user password',
        schema: {
          example: userPasswordOkSchema,
        },
      }),
      ApiUnauthorizedResponse({
        description: 'Unauthorized (Incorrect password)',
        schema: {
          example: userPasswordUnauthorizedSchema,
        },
      }),
      ApiInternalServerErrorResponse({
        description: 'Internal server error',
      }),
      ApiBearerAuth(),
    ),
};
