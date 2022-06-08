import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfig } from './config/environment.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserAddressModule } from './user-address/user-address.module';
import { UserContactsModule } from './user-contacts/user-contacts.module';
import { AccreditationModule } from './accreditation/accreditation.module';
import { UserPasswordModule } from './user-password/user-password.module';
import { EventsModule } from './events/events.module';
import { TokenModule } from './token/token.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { SalesTypesModule } from './sales-types/sales-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(new EnvironmentConfig().getTypeOrmConfig()),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    UserModule,
    AuthModule,
    UserAddressModule,
    UserContactsModule,
    EventsModule,
    AccreditationModule,
    TokenModule,
    UserPasswordModule,
    SalesTypesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
