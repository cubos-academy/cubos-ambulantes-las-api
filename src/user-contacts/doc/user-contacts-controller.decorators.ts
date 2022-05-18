import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { userContactsExampleSchema } from './user-contacts-exampe.schema';

export const userContactsControllerDecorators = {
  get: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Get user contacts',
      }),
      ApiOkResponse({
        description: 'User contacts found successfully',
        schema: { example: userContactsExampleSchema },
      }),
      ApiUnauthorizedResponse({
        description: 'Unauthorized',
      }),
      ApiInternalServerErrorResponse({
        description: 'Internal server error',
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Bearer Token',
        required: true,
      }),
    ),

  put: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Updates user contacts',
      }),
      ApiOkResponse({
        description: 'Contacts updated successfully',
        schema: { example: userContactsExampleSchema },
      }),
      ApiConflictResponse({
        description: 'Email already in use',
      }),
      ApiUnauthorizedResponse({
        description: 'Unauthorized',
      }),
      ApiInternalServerErrorResponse({
        description: 'Internal Server Errror',
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Bearer Token',
        required: true,
      }),
    ),
};
