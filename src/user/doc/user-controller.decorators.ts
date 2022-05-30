import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { newUserSchemaExample, userSchemaExample } from './user-example.schema';

export const userControllerSwaggerDecorators = {
  create: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Creates a new user',
        description: 'With this endpoint you can create a new user',
      }),
      ApiCreatedResponse({
        description: 'User created successfully',
        schema: {
          example: newUserSchemaExample,
        },
      }),
      ApiConflictResponse({
        description: 'Email or CPF already exists',
      }),
      ApiInternalServerErrorResponse({
        description: 'Internal server error',
      }),
      ApiBadRequestResponse({
        description: 'Bad request',
      }),
    ),

  findOne: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Get user details',
        description:
          'With this endpoint you can get details about authenticated user',
      }),
      ApiOkResponse({
        description: 'User found',
        schema: {
          example: userSchemaExample,
        },
      }),
      ApiInternalServerErrorResponse({
        status: 500,
        description: 'Internal server error',
      }),
      ApiUnauthorizedResponse({
        description: 'Unauthorized',
      }),
      ApiBearerAuth(),
    ),

  update: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Update user details',
        description:
          'With this endpoint you can update basic details about the authenticated user, but whether you need to update contacts or address, take a look at other endpoints',
      }),
      ApiOkResponse({
        description: 'Updated successfully',
        schema: { example: userSchemaExample },
      }),
      ApiConflictResponse({
        description: 'CPF or Email already in use',
      }),
      ApiInternalServerErrorResponse({
        description: 'Internal server error',
      }),
      ApiUnauthorizedResponse({
        description: 'Unauthorized',
      }),
      ApiBadRequestResponse({
        description: 'Bad request',
      }),
      ApiBearerAuth(),
    ),
};
