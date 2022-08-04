import { Module } from '@nestjs/common';
import { AccreditationService } from './accreditation.service';
import { AccreditationController } from './accreditation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { EventEntity } from '../events/entities/event-entity';
import { UserEntity } from '../user/entities/user.entity';
import { AccreditationEntity } from '../accreditation/entities/accreditation.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([AccreditationEntity, EventEntity, UserEntity]),
  ],
  controllers: [AccreditationController],
  providers: [AccreditationService],
})
export class AccreditationModule {}
