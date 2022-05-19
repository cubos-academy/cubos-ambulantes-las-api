import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { eventStatus } from 'src/entities/event-entity';
import {
  eventExampleSchema,
  eventsExampleSchema,
} from './events-example.schema';

export const eventsControllerDecorators = {
  findAll: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Gets all events',
        description: 'With this endpoint you can get all available events',
      }),
      ApiOkResponse({
        description: 'Successfully found events',
        schema: {
          example: eventsExampleSchema,
          description: 'status: [1 = scheduled, 2 = inProgress, 3 = finished]',
        },
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

  findOne: () =>
    applyDecorators(
      ApiOperation({
        summary: 'Get specific event details',
        description:
          'With this endpoint you can find details about only one event',
      }),
      ApiOkResponse({
        description: 'Successfully found item',
        schema: {
          example: eventExampleSchema,
          description: 'status: [1 = scheduled, 2 = inProgress, 3 = finished]',
        },
      }),
      ApiNotFoundResponse({
        description: 'Item not found',
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

  findByStatus: () =>
    applyDecorators(
      ApiParam({
        name: 'eventStatus',
        schema: {
          enum: [
            eventStatus.scheduled,
            eventStatus.inProgress,
            eventStatus.finished,
          ],
        },
      }),
      ApiOperation({
        summary: 'Filter events by status number',
        description: 'status: [1 = scheduled, 2 = inProgress, 3 = finished]',
      }),
      ApiOkResponse({
        description: 'Sucessfully found itens',
        schema: {
          example: eventsExampleSchema,
          description: 'status: [1 = scheduled, 2 = inProgress, 3 = finished]',
        },
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
};
