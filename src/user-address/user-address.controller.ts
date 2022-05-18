import { Controller, Get, Body, Put, UseGuards, Req } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UpdateAddressDto } from './dto/update-user-address.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { QueryFailedError } from 'typeorm';
import { throwDriverErrors } from 'src/utils/driver-errors.util';

@ApiTags('user')
@Controller('user/address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @UseGuards(AuthGuard())
  @Get()
  async findAll(@Req() req) {
    const id: number = req.user.addressId;
    return this.userAddressService.findOne(id);
  }

  @Put()
  @UseGuards(AuthGuard())
  async update(@Req() req, @Body() updateUserAddressDto: UpdateAddressDto) {
    const id: number = req.user.id;

    return this.userAddressService
      .update(id, updateUserAddressDto)
      .catch((err: QueryFailedError) => {
        const errorCode = err.driverError.code;
        throwDriverErrors(errorCode);
      });
  }
}
