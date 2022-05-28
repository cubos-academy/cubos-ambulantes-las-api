import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfig } from './config/environment.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserAddressModule } from './user-address/user-address.module';
import { UserContactsModule } from './user-contacts/user-contacts.module';
import { EventsModule } from './events/events.module';
import { AccreditationModule } from './accreditation/accreditation.module';
import { TokenModule } from './token/token.module';
import { UserPasswordModule } from './user-password/user-password.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(new EnvironmentConfig().getTypeOrmConfig()),
    UserModule,
    AuthModule,
    UserAddressModule,
    UserContactsModule,
    EventsModule,
    AccreditationModule,
    TokenModule,
    UserPasswordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
