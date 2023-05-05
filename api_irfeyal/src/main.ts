import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/irfeyal/');

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: false,
      whitelist: true,
    }),
  );

  app.enableCors();
  const configSwagger = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Irfeyal V1')
    .setDescription('Descripcion de cada endpoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(AppModule.port);
}
bootstrap();
