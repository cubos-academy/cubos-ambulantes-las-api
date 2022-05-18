import { Controller, Get, Body, Req, Put, UseGuards } from '@nestjs/common';
import { UserContactsService } from './user-contacts.service';
import { UpdateUserContactsDto } from './dto/update-user-contact.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryFailedError } from 'typeorm';
import { throwDriverErrors } from 'src/utils/driver-errors.util';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('user')
@Controller('user/contacts')
export class UserContactsController {
  constructor(private readonly userContactsService: UserContactsService) {}

  @Get()
  @UseGuards(AuthGuard())
  async findOne(@Req() req) {
    const id: number = req.user.contactsId;

    return this.userContactsService
      .findOne(id)
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }

  @Put()
  @UseGuards(AuthGuard())
  async update(
    @Req() req,
    @Body() updateUserContactDto: UpdateUserContactsDto,
  ) {
    const id: number = req.user.contactsId;

    return this.userContactsService
      .update(id, updateUserContactDto)
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }
}
