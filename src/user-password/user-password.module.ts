import { Module } from '@nestjs/common';
import { UserPasswordService } from './user-password.service';
import { UserPasswordController } from './user-password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserPasswordController],
  providers: [UserPasswordService],
})
export class UserPasswordModule {}
