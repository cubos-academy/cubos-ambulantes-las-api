import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAddressDto } from './dto/update-user-address.dto';
import { UserAddressEntity } from './entities/user_address.entity';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(UserAddressEntity)
    private readonly addressRepository: Repository<UserAddressEntity>,
  ) {}

  findOne(id: number): Promise<UserAddressEntity> {
    return this.addressRepository.findOne(id);
  }

  update(id: number, data: UpdateAddressDto): Promise<UserAddressEntity> {
    data.id = id;
    return this.addressRepository.save(data);
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
