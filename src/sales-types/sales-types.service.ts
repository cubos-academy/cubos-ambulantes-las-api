import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSalesTypeDto } from './dto/create-sales-type.dto';
import { SalesTypeEntity } from './entities/sales-type.entity';

@Injectable()
export class SalesTypesService {
  constructor(
    @InjectRepository(SalesTypeEntity)
    private readonly salesTypeRepository: Repository<SalesTypeEntity>,
  ) {}

  create(createSalesTypeDto: CreateSalesTypeDto) {
    return this.salesTypeRepository.insert(createSalesTypeDto);
  }

  findAll() {
    return this.salesTypeRepository.find();
  }

  findOne(id: number) {
    return this.salesTypeRepository.findOne(id);
  }

  delete(id: number) {
    return this.salesTypeRepository.delete(id);
  }
}
