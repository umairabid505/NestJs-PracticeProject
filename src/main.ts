import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe(
  //   {
  //     whitelist: true,       // remove extra fields
  //     forbidNonWhitelisted: true, // throw error on extra fields
  //     transform: true, 
  //   }
  // ));

  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Add this:
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
