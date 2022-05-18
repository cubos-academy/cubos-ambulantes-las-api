import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  newUserSchemaExample,
  userSchemaExample,
} from 'src/user/doc/user-example.schema';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryFailedError } from 'typeorm';
import { throwDriverErrors } from 'src/utils/driver-errors.util';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard())
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService
      .create(createUserDto)
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }

  @Get()
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
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true,
  })
  async findOne(@Req() req) {
    const id: number = req.user.id;
    const result = await this.userService.find(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return result;
  }

  @Put()
  @ApiOperation({ summary: 'Update user details' })
  @ApiOkResponse({
    description: 'Updated successfully',
    schema: { example: userSchemaExample },
  })
  @ApiConflictResponse({
    description: 'CPF or Email already in use',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
    required: true,
  })
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const id = req.user.id;
    return this.userService
      .update(id, updateUserDto)
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }
}
