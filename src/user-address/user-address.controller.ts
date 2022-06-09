import { Controller, Get, Body, UseGuards, Req, Patch } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UpdateAddressDto } from './dto/update-user-address.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QueryFailedError } from 'typeorm';
import { throwDriverErrors } from '../utils/driver-errors/driver-errors.util';
import { userAddressControllerDecorators } from './doc/user-address-controller.decorators';

@ApiTags('user')
@Controller('user/address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @UseGuards(AuthGuard())
  @userAddressControllerDecorators.findOne()
  @Get()
  async findOne(@Req() req) {
    const id: number = req.user.addressId;

    return this.userAddressService
      .findOne(id)
      .then((result) => {
        return this.userAddressService.filter(result);
      })
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }

  @Patch()
  @userAddressControllerDecorators.update()
  @UseGuards(AuthGuard())
  async update(@Req() req, @Body() updateUserAddressDto: UpdateAddressDto) {
    const id: number = req.user.addressId;

    return this.userAddressService
      .update(id, updateUserAddressDto)
      .then((result) => {
        return this.userAddressService.filter(result);
      })
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }
}
