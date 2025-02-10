import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // then validator will strip validated object of any properties that do not have any decorators (ValidatorOptions)
      forbidNonWhitelisted: true, // instead of stripping non-whitelisted properties validator will throw an error (ValidatorOptions)
      transform: true, // allow automatic transformation of incoming data (ValidationPipeOptions)
      transformOptions: {
        enableImplicitConversion: true, // enable transformation of data types (ClassTransformOptions)
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
