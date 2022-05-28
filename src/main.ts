import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import generateOrmConfig from './config/generate-ormconfig';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(helmet());
  app.enableCors();

  generateOrmConfig();

  const config = new DocumentBuilder()
    .setTitle('las-api')
    .setDescription(
      'Salvador street vendor management system API, created by Backend Team from  Cubos Academy.',
    )
    .setExternalDoc(
      'Github repository (⭐ ? 🥰 : 😭)',
      'https://github.com/IvsonEmidio/cubos-ambulantes-las-api',
    )
    .setVersion(process.env.API_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: `LAS - API - ${process.env.API_VERSION}`,
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
