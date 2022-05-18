import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserAddressEntity } from 'src/entities/user_address.entity';
import { Repository } from 'typeorm';
import { UpdateAddressDto } from './dto/update-user-address.dto';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @InjectRepository(UserAddressEntity)
    private readonly addressRepo: Repository<UserAddressEntity>,
  ) {}

  async findOne(id: number): Promise<UserAddressEntity> {
    const address = await this.addressRepo.findOne(id);

    if (!address) {
      throw new NotFoundException();
    }

    return this.filterResult(address);
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<UserAddressEntity> {
    updateAddressDto.id = id;
    const result = await this.addressRepo.save(updateAddressDto);

    return this.filterResult(result);
  }

  /**
   * @description Filter results from methods and delete unecessary columns
   * @param address Address Entity
   */
  private filterResult(address: UserAddressEntity) {
    if (address) {
      delete address.id;
    }

    return address;
  }
}
