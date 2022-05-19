import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { credentialsSchemaExample } from './credentials-example.schema';

export const authControllerSwaggerDecorators = {
  post: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Authenticate user account',
        description:
          'With this endpoint you can authenticate a user and get token access',
      }),
      ApiCreatedResponse({
        description: 'Authenticated successfully',
        schema: { example: credentialsSchemaExample },
      }),
      ApiInternalServerErrorResponse({
        description: 'Internal server error',
      }),
      ApiNotFoundResponse({
        description: 'User not found',
      }),
      ApiUnauthorizedResponse({
        description: 'Email or password incorrect',
      }),
    ),
};
