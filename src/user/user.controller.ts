import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Put,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  newUserSchemaExample,
  userSchemaExample,
} from 'src/swagger/schemas/user.schema';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryFailedError } from 'typeorm';
import { throwDriverErrors } from 'src/utils/driver-errors.util';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiCreatedResponse({
    description: 'User created successfully',
    schema: {
      example: newUserSchemaExample,
    },
  })
  @ApiConflictResponse({
    description: 'Email or CPF already exists',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService
      .create(createUserDto)
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user details' })
  @ApiOkResponse({
    description: 'User found',
    schema: {
      example: userSchemaExample,
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  async findOne(@Param('id') id: number) {
    const result = await this.userService.find(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return result;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user details' })
  @ApiOkResponse({
    description: 'Updated successfully',
    schema: { example: userSchemaExample },
  })
  @ApiConflictResponse({
    description: 'CPF or Email already exists on other user',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService
      .update(id, updateUserDto)
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }
}
