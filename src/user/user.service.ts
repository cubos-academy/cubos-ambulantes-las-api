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
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,

    @InjectRepository(UserAddressEntity)
    private readonly addressRepo: Repository<UserAddressEntity>,

    @InjectRepository(UserContactsEntity)
    private readonly contactsRepo: Repository<UserContactsEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    //Address (Relational)
    const addressEntity = new UserAddressEntity();
    const createAddress = await this.addressRepo.save(addressEntity);
    createUserDto.address = createAddress;

    //Contacts (Relational)
    const contactsEntity = new UserContactsEntity();
    contactsEntity.email = createUserDto.email;
    const createContact = await this.contactsRepo.save(contactsEntity);
    createUserDto.contacts = createContact;

    //User
    const hashedPassword = await PasswordHelper.hash(createUserDto.password);
    createUserDto.password = hashedPassword;

    createUserDto.createdAt = new Date();

    const result = await this.repo.save(createUserDto);
    delete result.password;
    delete result.address.id;
    delete result.contacts.id;

    return result;
  }

  async find(id: number): Promise<UserEntity> {
    const result = await this.repo.findOne(
      { id },
      { relations: ['address', 'contacts'] },
    );

    if (result) {
      delete result.password;
      delete result.address.id;
      delete result.contacts.id;
    }

    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    updateUserDto.id = id;
    await this.repo.save(updateUserDto);

    return this.find(id);
  }
}
