import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryFailedError } from 'typeorm';
import { throwDriverErrors } from '../utils/driver-errors.util';
import { AuthGuard } from '@nestjs/passport';
import { userControllerSwaggerDecorators } from './doc/user-controller.decorators';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @userControllerSwaggerDecorators.create()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService
      .create(createUserDto)
      .then((result) => {
        return this.userService.filter(result);
      })
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }

  @Get()
  @userControllerSwaggerDecorators.findOne()
  @UseGuards(AuthGuard())
  async findOne(@Req() req) {
    const id: number = req.user.id;

    return this.userService
      .find(id)
      .then((result) => {
        return this.userService.filter(result);
      })
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }

  @Patch()
  @UseGuards(AuthGuard())
  @userControllerSwaggerDecorators.update()
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const id: number = req.user.id;

    return this.userService
      .update(id, updateUserDto)
      .then((result) => {
        return this.userService.filter(result);
      })
      .catch((err: QueryFailedError) => {
        const errorCode = err?.driverError?.code;
        throwDriverErrors(errorCode);
      });
  }
}
