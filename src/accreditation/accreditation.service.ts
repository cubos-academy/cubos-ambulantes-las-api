import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccreditationEntity } from 'src/entities/accreditation.entity';
import { EventEntity } from 'src/entities/event-entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

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
      const user = new UserEntity();
      user.id = userId;

      const newAccreditation = new AccreditationEntity();

      newAccreditation.user = user;
      newAccreditation.event = event;

      const result = await this.accreditationRepo.save(newAccreditation, {
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

  async findByEvent(
    userId: number,
    eventId: number,
  ): Promise<AccreditationEntity[]> {
    const user = new UserEntity();
    user.id = userId;

    const event = new EventEntity();
    event.id = eventId;

    return this.accreditationRepo.find({
      where: { user, event },
      relations: ['event'],
    });
  }

  async remove(id: number) {
    return this.accreditationRepo.delete({ id });
  }
}
