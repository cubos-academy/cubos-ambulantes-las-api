import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfig } from './config/environment.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserAddressModule } from './user-address/user-address.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(new EnvironmentConfig().getTypeOrmConfig()),
    UserModule,
    AuthModule,
    UserAddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
