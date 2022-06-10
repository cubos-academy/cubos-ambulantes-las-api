import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccreditationEntity } from 'src/accreditation/entities/accreditation.entity';
import { Repository } from 'typeorm';
import { EventEntity } from 'src/events/entities/event-entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateAccreditationDto } from './dto/create-accreditation.dto';
import {
  idsToSalesTypesEntities,
  SalesTypeEntity,
} from 'src/sales-types/entities/sales-type.entity';

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

  async create(
    userId: number,
    createAccredidationDto: CreateAccreditationDto,
  ): Promise<AccreditationEntity> {
    const { eventId, salesType } = createAccredidationDto;

    const event = await this.eventRepo.findOne(eventId, {
      relations: ['allowedSalesTypes'],
    });
    if (!event) {
      throw new NotFoundException(
        'not exists an event with this id, check the fields and try again',
      );
    }

    const isSalesTypesAcceptable = this.isReceivedSalesTypesAcceptable(
      salesType,
      event.allowedSalesTypes,
    );
    if (!isSalesTypesAcceptable) {
      throw new BadRequestException(
        'salesType that you sent are not allowed for this event',
      );
    }

    const userAccreditations = await this.findAll(userId);
    const isUserAlreadyAccredited = this.isUserAlreadyAccredited(
      eventId,
      userAccreditations,
    );
    if (isUserAlreadyAccredited) {
      throw new ConflictException('user already are accredited on this event');
    }

    const accreditationEntity = new AccreditationEntity();
    accreditationEntity.salesTypes = idsToSalesTypesEntities(salesType);

    const accreditationData = {
      ...accreditationEntity,
      user: {
        id: userId,
      },
      event,
    };

    const result = await this.accreditationRepo.save(accreditationData, {
      reload: true,
    });
    delete result.user;
    delete result.event.allowedSalesTypes;

    return result;
  }

  async findAll(userId: number): Promise<AccreditationEntity[]> {
    const result = await this.userRepo.findOne(userId, {
      relations: [
        'accreditations',
        'accreditations.event',
        'accreditations.salesTypes',
      ],
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
      relations: ['event', 'salesTypes'],
    });
  }

  remove(id: number) {
    return this.accreditationRepo.delete({ id });
  }

  /**
   * @description determine whether received salesTypes ids from DTO are acceptable for the given event
   */
  private isReceivedSalesTypesAcceptable(
    receivedSalesTypes: number[],
    eventAllowedSalesTypes: SalesTypeEntity[],
  ): boolean {
    let isAcceptable = true;

    receivedSalesTypes.forEach((id) => {
      const isAllowed = eventAllowedSalesTypes.find(
        (salesType) => salesType.id === id,
      );

      if (!isAllowed) {
        isAcceptable = false;
      }
    });

    return isAcceptable;
  }

  private isUserAlreadyAccredited(
    receivedEventId: number,
    userAccreditations: AccreditationEntity[],
  ): boolean {
    let isAlreadyAccredited = false;

    userAccreditations.forEach((accredidation) => {
      if (accredidation.event.id === receivedEventId) {
        isAlreadyAccredited = true;
      }
    });

    return isAlreadyAccredited;
  }
}
