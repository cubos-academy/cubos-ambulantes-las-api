import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordHelper } from '../helpers/password-helper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserAddressEntity } from 'src/entities/user_address.entity';
import { UserContactsEntity } from 'src/entities/user_contacts.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(UserAddressEntity)
    private readonly addressRepository: Repository<UserAddressEntity>,

    @InjectRepository(UserContactsEntity)
    private readonly contactsRepository: Repository<UserContactsEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    //Address (Relational)
    const addressEntity = new UserAddressEntity();
    const createAddress = await this.addressRepository.save(addressEntity);
    createUserDto.address = createAddress;

    //Contacts (Relational)
    const contactsEntity = new UserContactsEntity();
    contactsEntity.email = createUserDto.email;
    const createContact = await this.contactsRepository.save(contactsEntity);
    createUserDto.contacts = createContact;

    //User
    const hashedPassword = await PasswordHelper.hash(createUserDto.password);
    createUserDto.password = hashedPassword;

    createUserDto.createdAt = new Date();

    const result = await this.userRepository.save(createUserDto);
    delete result.email;

    return result;
  }

  async find(id: number): Promise<UserEntity> {
    return this.userRepository.findOne(
      { id },
      { relations: ['address', 'contacts'] },
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    updateUserDto.id = id;
    await this.userRepository.save(updateUserDto);

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
