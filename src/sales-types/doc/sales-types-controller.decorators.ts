import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { salesTypesListSchema } from './sales-types-example.schema';

export const salesTypesDecorators = {
  findAll: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Get all available sales types',
        description: 'With this endpoint you can get all available sales types',
      }),
      ApiOkResponse({
        description: 'Success',
        schema: { example: salesTypesListSchema },
      }),
      ApiUnauthorizedResponse({
        description: 'Unauthorized',
      }),
      ApiInternalServerErrorResponse({
        description: 'Internal server error',
      }),
      ApiBearerAuth(),
    ),

  findOne: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Get details about specific sales type',
        description:
          'With this endpoint you can get details about specific sales type',
      }),
      ApiOkResponse({
        description: 'Successfully found item',
        schema: { example: salesTypesListSchema[0] },
      }),
      ApiNotFoundResponse({
        description: 'Not found',
      }),
      ApiUnauthorizedResponse({
        description: 'Unauthorized',
      }),
      ApiInternalServerErrorResponse({
        description: 'Internal server error',
      }),
      ApiBearerAuth(),
    ),
};
