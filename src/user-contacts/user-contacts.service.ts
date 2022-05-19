import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserContactsEntity } from 'src/entities/user_contacts.entity';
import { Repository } from 'typeorm';
import { UpdateUserContactsDto } from './dto/update-user-contact.dto';

@Injectable()
export class UserContactsService {
  constructor(
    @InjectRepository(UserContactsEntity)
    private readonly contactsRepo: Repository<UserContactsEntity>,
  ) {}

  async findOne(id: number): Promise<UserContactsEntity> {
    return this.contactsRepo.findOne(id);
  }

  async update(
    id: number,
    updateUserContactDto: UpdateUserContactsDto,
  ): Promise<UserContactsEntity> {
    updateUserContactDto.id = id;

    await this.contactsRepo.save(updateUserContactDto);

    return this.contactsRepo.findOne(id);
  }

  /**
   * @description filter results and remove unnecessary columns
   * @param entity user contacts entity
   * @returns the same entity but with no unnecessary columns
   */
  filter(entity: UserContactsEntity) {
    if (entity) {
      delete entity.id;
    }

    return entity;
  }
}
