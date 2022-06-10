import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '../events/entities/event-entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import {
  idsToSalesTypesEntities,
  SalesTypeEntity,
} from 'src/sales-types/entities/sales-type.entity';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  create(createEventDto: CreateEventDto): Promise<EventEntity> {
    const allowedSalesTypes = idsToSalesTypesEntities(
      createEventDto.allowedSalesTypes,
    );

    const eventData = {
      ...createEventDto,
      allowedSalesTypes,
    };

    return this.eventRepository.save(eventData);
  }

  findAll(): Promise<EventEntity[]> {
    return this.eventRepository.find({ relations: ['allowedSalesTypes'] });
  }

  findOne(id: number): Promise<EventEntity> {
    return this.eventRepository.findOne(id, {
      relations: ['allowedSalesTypes'],
    });
  }

  findByStatus(status: number): Promise<EventEntity[]> {
    return this.eventRepository.find({
      where: { status },
      relations: ['allowedSalesTypes'],
    });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    let allowedSalesTypes: SalesTypeEntity[];

    if (updateEventDto.allowedSalesTypes) {
      allowedSalesTypes = idsToSalesTypesEntities(
        updateEventDto.allowedSalesTypes,
      );
    }

    const updatedEventData = {
      id,
      ...updateEventDto,
      allowedSalesTypes,
    };

    return this.eventRepository.save(updatedEventData);
  }

  remove(id: number) {
    this.eventRepository.delete({ id });
  }
}
