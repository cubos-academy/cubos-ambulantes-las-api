import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import generateOrmConfig from './config/generate-ormconfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  generateOrmConfig();
  await app.listen(3000);
}
bootstrap();
