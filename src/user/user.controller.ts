import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryFailedError } from 'typeorm';
import { driverErrorCodes } from 'src/driver/error.codes';

@ApiTags()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService
      .create(createUserDto)
      .catch((err: QueryFailedError) => {
        if (err.driverError.code === driverErrorCodes.CONFLICT_ERROR) {
          throw new ConflictException('cpf or email already exists');
        } else {
          throw new InternalServerErrorException();
        }
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
        if (err.driverError.code === driverErrorCodes.CONFLICT_ERROR) {
          throw new ConflictException(
            'cpf or email already exists, check the fields and try again',
          );
        } else {
          throw new InternalServerErrorException();
        }
      });
  }
}
