import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserAddressEntity } from '../user-address/entities/user_address.entity';
import { UserContactsEntity } from '../user-contacts/entities/user_contacts.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserAddressEntity,
      UserContactsEntity,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
