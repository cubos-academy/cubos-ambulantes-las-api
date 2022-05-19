import { Module } from '@nestjs/common';
import { AccreditationService } from './accreditation.service';
import { AccreditationController } from './accreditation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccreditationEntity } from 'src/entities/accreditation.entity';
import { PassportModule } from '@nestjs/passport';
import { EventEntity } from 'src/entities/event-entity';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([AccreditationEntity, EventEntity, UserEntity]),
  ],
  controllers: [AccreditationController],
  providers: [AccreditationService],
})
export class AccreditationModule {}
