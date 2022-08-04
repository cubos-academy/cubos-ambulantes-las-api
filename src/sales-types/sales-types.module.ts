import { Module } from '@nestjs/common';
import { SalesTypesService } from './sales-types.service';
import { SalesTypesController } from './sales-types.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesTypeEntity } from './entities/sales-type.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([SalesTypeEntity]),
  ],
  controllers: [SalesTypesController],
  providers: [SalesTypesService],
})
export class SalesTypesModule {}
