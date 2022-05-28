import { applyDecorators } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { updateTokenExampleSchema } from './token-example.schema';

export const tokenControllerDecorators = {
  update: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Refresh an expired token',
        description:
          'With this endpoint you can refresh an expired token and get a newer valid token',
      }),
      ApiOkResponse({
        description: 'Successfully generated new token',
        schema: {
          example: updateTokenExampleSchema,
        },
      }),
      ApiUnauthorizedResponse({
        description: 'Unauthorized',
      }),
      ApiInternalServerErrorResponse({
        description: 'Internal server error',
      }),
    ),
};
