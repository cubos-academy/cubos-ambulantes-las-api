import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { AdminTempHelper } from 'src/helpers/admin-authorization.helper';
import { throwDriverErrors } from 'src/utils/driver-errors.util';
import { QueryFailedError } from 'typeorm';
import { AccreditationService } from './accreditation.service';
import { accreditationDecorators } from './doc/accreditation-controller.decorators';

@ApiTags('accreditation')
@Controller('accreditation')
export class AccreditationController {
  constructor(private readonly accreditationService: AccreditationService) {}

  @UseGuards(AuthGuard())
  @accreditationDecorators.create()
  @Post(':eventId')
  async create(@Req() req, @Param('eventId') eventId: number) {
    const userId: number = req.user.id;

    const result = await this.accreditationService
      .create(userId, eventId)
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });

    if (!result) {
      throw new NotFoundException(
        'Not exists an event with this id, check the fields and try again',
      );
    }

    return result;
  }

  @UseGuards(AuthGuard())
  @accreditationDecorators.findAll()
  @Get()
  async findAll(@Req() req) {
    const userId: number = req.user.id;
    return this.accreditationService.findAll(userId);
  }

  @UseGuards(AuthGuard())
  @accreditationDecorators.findByEvent()
  @Get('/check/:eventId')
  async findByEvent(@Req() req, @Param('eventId') eventId: number) {
    const userId: number = req.user.id;
    const result = await this.accreditationService.findByEvent(userId, eventId);

    if (result.length === 0) {
      throw new NotFoundException();
    }

    return result;
  }

  //Admin endpoint
  @ApiExcludeEndpoint()
  @Delete(':id')
  async remove(@Param('id') id: number, @Body('adminKey') adminKey: string) {
    AdminTempHelper.adminOrThrown(adminKey);
    const result = await this.accreditationService.remove(id);

    if (result.affected > 0) {
      return {
        message: 'Successfully deleted the item',
      };
    }

    throw new NotFoundException();
  }
}
