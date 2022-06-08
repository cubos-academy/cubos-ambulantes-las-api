import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { SalesTypesService } from './sales-types.service';
import { CreateSalesTypeDto } from './dto/create-sales-type.dto';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { AdminTempHelper } from '../helpers/admin-authorization.helper';
import { AuthGuard } from '@nestjs/passport';
import { QueryFailedError } from 'typeorm';
import { throwDriverErrors } from '../utils/driver-errors.util';
import { salesTypesDecorators } from './doc/sales-types-controller.decorators';

@ApiTags('/sales')
@Controller('sales/types')
export class SalesTypesController {
  constructor(private readonly salesTypesService: SalesTypesService) {}

  @UseGuards(AuthGuard())
  @salesTypesDecorators.findAll()
  @Get()
  async findAll() {
    return this.salesTypesService.findAll();
  }

  @UseGuards(AuthGuard())
  @salesTypesDecorators.findOne()
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const item = await this.salesTypesService.findOne(id);

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  //Admin endpoint
  @ApiExcludeEndpoint()
  @Delete(':id')
  async remove(@Param('id') id: number, @Body('adminKey') adminKey: string) {
    AdminTempHelper.adminOrThrown(adminKey);

    const removedRow = await this.salesTypesService.delete(id);

    if (removedRow.affected > 0) {
      return {
        message: 'Removed successfully',
      };
    } else {
      throw new NotFoundException();
    }
  }

  //Admin endpoint
  @ApiExcludeEndpoint()
  @Post()
  async create(@Body() createSalesTypeDto: CreateSalesTypeDto) {
    AdminTempHelper.adminOrThrown(createSalesTypeDto.adminKey);

    return this.salesTypesService
      .create(createSalesTypeDto)
      .then(() => {
        return { message: 'Item created succesfully' };
      })
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;

        throwDriverErrors(errorCode);
      });
  }
}
