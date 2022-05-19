import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
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
        description:
          'With this endpoint you can get details about user contacts like email, phone and others',
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
        description: 'With this endpoint you can update user contacts details',
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
      ApiBadRequestResponse({
        description: 'Bad Request',
      }),
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Bearer Token',
        required: true,
      }),
    ),
};
