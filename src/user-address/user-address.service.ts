import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddressEntity } from 'src/entities/user_address.entity';
import { Repository } from 'typeorm';
import { UpdateAddressDto } from './dto/update-user-address.dto';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(UserAddressEntity)
    private readonly addressRepo: Repository<UserAddressEntity>,
  ) {}

  async findOne(id: number): Promise<UserAddressEntity> {
    return this.addressRepo.findOne(id);
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<UserAddressEntity> {
    updateAddressDto.id = id;
    return this.addressRepo.save(updateAddressDto);
  }

  /**
   * @description Filter results from methods and delete unecessary columns
   * @param entity Address Entity
   * @returns the same entity but with no unnecessary columns
   */
  filter(entity: UserAddressEntity) {
    if (entity) {
      delete entity.id;
    }

    return entity;
  }
}
