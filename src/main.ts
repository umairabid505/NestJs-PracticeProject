import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe(
  //   {
  //     whitelist: true,       // remove extra fields
  //     forbidNonWhitelisted: true, // throw error on extra fields
  //     transform: true,
  //   }
  // ));

  const config = new DocumentBuilder()
    .setTitle('Todo App')
    .setDescription("This app saves the todos for user's")
    .setVersion('1.0')
    .addTag('Todos')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Add this:
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
