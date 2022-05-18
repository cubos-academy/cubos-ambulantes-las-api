import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { newUserSchemaExample, userSchemaExample } from './user-example.schema';

export const userControllerSwaggerDecorators = {
  post: () =>
    applyDecorators(
      ApiOperation({ summary: 'Creates a new user' }),
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
    ),

  get: () =>
    applyDecorators(
      ApiOperation({ summary: 'Get user details' }),
      ApiOkResponse({
        description: 'User found',
        schema: {
          example: userSchemaExample,
        },
      }),
      ApiNotFoundResponse({
        description: 'User not found',
      }),
      ApiInternalServerErrorResponse({
        status: 500,
        description: 'Internal server error',
      }),
      ApiUnauthorizedResponse({
        description: 'Unauthorized',
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
      ApiOperation({ summary: 'Update user details' }),
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
      ApiBearerAuth(),
      ApiHeader({
        name: 'Authorization',
        description: 'Bearer Token',
        required: true,
      }),
    ),
};
