import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/token/jwt/jwt-strategy';
import { UserEntity } from 'src/user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([TokenEntity, UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_TOKEN_PASS,
      signOptions: {
        expiresIn: 18000,
      },
    }),
  ],
  controllers: [TokenController],
  providers: [TokenService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, TokenService],
})
export class TokenModule {}
