import { Controller, Get, Body, Req, UseGuards, Patch } from '@nestjs/common';
import { UserContactsService } from './user-contacts.service';
import { UpdateUserContactsDto } from './dto/update-user-contact.dto';
import { ApiTags } from '@nestjs/swagger';
import { QueryFailedError } from 'typeorm';
import { throwDriverErrors } from '../utils/driver-errors/driver-errors.util';
import { AuthGuard } from '@nestjs/passport';
import { userContactsControllerDecorators } from './doc/user-contacts-controller.decorators';

@ApiTags('user')
@Controller('user/contacts')
export class UserContactsController {
  constructor(private readonly userContactsService: UserContactsService) {}

  @Get()
  @userContactsControllerDecorators.findOne()
  @UseGuards(AuthGuard())
  async findOne(@Req() req) {
    const id: number = req.user.contactsId;

    return this.userContactsService
      .findOne(id)
      .then((result) => {
        return this.userContactsService.filter(result);
      })
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }

  @Patch()
  @userContactsControllerDecorators.update()
  @UseGuards(AuthGuard())
  async update(
    @Req() req,
    @Body() updateUserContactDto: UpdateUserContactsDto,
  ) {
    const id: number = req.user.contactsId;

    return this.userContactsService
      .update(id, updateUserContactDto)
      .then((result) => {
        return this.userContactsService.filter(result);
      })
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }
}
