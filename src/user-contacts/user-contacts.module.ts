import { Module } from '@nestjs/common';
import { UserContactsService } from './user-contacts.service';
import { UserContactsController } from './user-contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContactsEntity } from 'src/entities/user_contacts.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserContactsEntity]),
  ],
  controllers: [UserContactsController],
  providers: [UserContactsService],
})
export class UserContactsModule {}
