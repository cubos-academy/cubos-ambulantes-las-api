import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { userAddressExampleSchema } from './user-address-example.schema';

export const userAddressControllerDecorators = {
  get: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Get user address details',
        description:
          'With this endpoint you can get address details about the user',
      }),
      ApiOkResponse({
        description: 'User address found successfully',
        schema: {
          example: userAddressExampleSchema,
        },
      }),
      ApiUnauthorizedResponse({
        description: 'Unauthorized',
      }),
      ApiInternalServerErrorResponse({ description: 'Internal server error' }),
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
        summary: 'Updates user address details',
        description: 'With this endpoint you can update user address details',
      }),
      ApiOkResponse({
        description: 'User address updated successfully',
        schema: {
          example: userAddressExampleSchema,
        },
      }),
      ApiUnauthorizedResponse({
        description: 'Unauthorized',
      }),
      ApiInternalServerErrorResponse({
        description: 'Internal server error',
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
