import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfig } from './config/environment.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(new EnvironmentConfig().getTypeOrmConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
