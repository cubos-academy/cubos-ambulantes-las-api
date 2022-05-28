import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccreditationEntity } from 'src/accreditation/entities/accreditation.entity';
import { Repository } from 'typeorm';
import { EventEntity } from 'src/events/entities/event-entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AccreditationService {
  constructor(
    @InjectRepository(AccreditationEntity)
    private readonly accreditationRepo: Repository<AccreditationEntity>,

    @InjectRepository(EventEntity)
    private readonly eventRepo: Repository<EventEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(userId: number, eventId: number): Promise<AccreditationEntity> {
    const event = await this.eventRepo.findOne(eventId);
    if (event) {
      const data = {
        ...new AccreditationEntity(),
        user: {
          id: userId,
        },
        event,
      };

      const result = await this.accreditationRepo.save(data, {
        reload: true,
      });
      delete result.user;

      return result;
    }
  }

  async findAll(userId: number): Promise<AccreditationEntity[]> {
    const result = await this.userRepo.findOne(userId, {
      relations: ['accreditations', 'accreditations.event'],
    });

    return result.accreditations;
  }

  findByEvent(userId: number, eventId: number): Promise<AccreditationEntity[]> {
    const searchData = {
      event: {
        id: eventId,
      },
      user: {
        id: userId,
      },
    };

    return this.accreditationRepo.find({
      where: searchData,
      relations: ['event'],
    });
  }

  remove(id: number) {
    return this.accreditationRepo.delete({ id });
  }
}
