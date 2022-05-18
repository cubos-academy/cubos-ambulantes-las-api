import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryFailedError } from 'typeorm';
import { throwDriverErrors } from 'src/utils/driver-errors.util';

@ApiTags()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService
      .create(createUserDto)
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }

  //TODO - This method needs to get id from authenticated user.
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const result = await this.userService.find(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return result;
  }

  //TODO - This method needs to get id from authenticated user.
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService
      .update(id, updateUserDto)
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }
}
