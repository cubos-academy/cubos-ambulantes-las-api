import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/entities/event-entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}
  async create(createEventDto: CreateEventDto): Promise<EventEntity> {
    return this.eventRepository.save(createEventDto);
  }

  async findAll(): Promise<EventEntity[]> {
    return this.eventRepository.find();
  }

  async findOne(id: number): Promise<EventEntity> {
    return this.eventRepository.findOne(id);
  }

  async findByStatus(status: number): Promise<EventEntity[]> {
    return this.eventRepository.find({ status });
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    updateEventDto.id = id;
    delete updateEventDto.adminKey;
    return this.eventRepository.save(updateEventDto);
  }

  remove(id: number) {
    this.eventRepository.delete({ id });
  }
}
