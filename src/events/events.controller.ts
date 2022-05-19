import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { QueryFailedError } from 'typeorm';
import { throwDriverErrors } from 'src/utils/driver-errors.util';
import { AuthGuard } from '@nestjs/passport';
import { AdminTempHelper } from 'src/helpers/admin-authorization.helper';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { eventsControllerDecorators } from './doc/events-controller.decorators';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @eventsControllerDecorators.findAll()
  @UseGuards(AuthGuard())
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @eventsControllerDecorators.findOne()
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: number) {
    const result = await this.eventsService.findOne(id);

    if (result) {
      return result;
    }
    throw new NotFoundException();
  }

  @eventsControllerDecorators.findByStatus()
  @Get('/status/:eventStatus')
  @UseGuards(AuthGuard())
  async findByStatus(@Param('eventStatus') evStatus: number) {
    return this.eventsService.findByStatus(evStatus);
  }

  //Admin endpoint
  @ApiExcludeEndpoint()
  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    const receivedAdmKey = createEventDto.adminKey;
    AdminTempHelper.adminOrThrown(receivedAdmKey);
    delete createEventDto.adminKey;

    return this.eventsService
      .create(createEventDto)
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }

  //Admin endpoint
  @ApiExcludeEndpoint()
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const receivedAdmKey = updateEventDto.adminKey;
    AdminTempHelper.adminOrThrown(receivedAdmKey);

    const isItemExisting = await this.eventsService.findOne(id);

    if (isItemExisting) {
      return this.eventsService
        .update(id, updateEventDto)
        .catch((err: QueryFailedError) => {
          const errorCode = err.driverError.code;
          throwDriverErrors(errorCode);
        });
    } else {
      throw new NotFoundException();
    }
  }

  //Admin endpoint
  @ApiExcludeEndpoint()
  @Delete(':id')
  async remove(@Param('id') id: number, @Body('adminKey') adminKey: string) {
    AdminTempHelper.adminOrThrown(adminKey);

    const isItemExisting = await this.eventsService.findOne(id);

    if (isItemExisting) {
      return this.eventsService.remove(id);
    } else {
      throw new NotFoundException();
    }
  }
}
