import { Injectable, NotFoundException } from '@nestjs/common';
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
    const result = await this.contactsRepo.findOne(id);

    if (!result) {
      throw new NotFoundException();
    }

    return this.filterResults(result);
  }

  async update(
    id: number,
    updateUserContactDto: UpdateUserContactsDto,
  ): Promise<UserContactsEntity> {
    updateUserContactDto.id = id;

    await this.contactsRepo.save(updateUserContactDto);

    const result = await this.contactsRepo.findOne(id);

    return this.filterResults(result);
  }

  /**
   * @description filter results and remove unnecessary columns
   * @param entity user contacts entity
   * @returns the same entity but with no unnecessary columns
   */
  private filterResults(entity: UserContactsEntity) {
    if (entity) {
      delete entity.id;
    }

    return entity;
  }
}
