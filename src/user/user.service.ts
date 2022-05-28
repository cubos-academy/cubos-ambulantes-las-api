import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordHelper } from '../helpers/password-helper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await PasswordHelper.hash(createUserDto.password);
    createUserDto.password = hashedPassword;

    createUserDto.createdAt = new Date();

    const data = {
      ...createUserDto,
      contacts: {
        email: createUserDto.email,
      },
      address: {},
    };

    const result = await this.userRepository.save(data);
    delete result.email;

    return result;
  }

  find(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(
      { id },
      { relations: ['address', 'contacts'] },
    );
  }

  async update(id: number, data: UpdateUserDto): Promise<UserEntity> {
    data.id = id;
    await this.userRepository.save(data);

    return this.userRepository.findOne(id, {
      relations: ['address', 'contacts'],
    });
  }

  /**
   * @description filter results from others methods and removes unnecessary columns
   * @param entity User Entity
   * @returns The same entity, but with no unnecessary columns
   */
  public filter(entity: UserEntity): UserEntity {
    if (entity) {
      delete entity.password;
      delete entity.addressId;
      delete entity.contactsId;
      entity.address && delete entity.address.id;
      entity.contacts && delete entity.contacts.id;
    }

    return entity;
  }
}
