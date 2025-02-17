import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

const bootstrap = async () => {
  const PORT = process.env.PORT || 5500;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  });

  const config = new DocumentBuilder()
    .setTitle('E-commerce api')
    .setDescription('Api for clothing stores')
    .setVersion('1.0')
    .addTag('cloths')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );

  await app.listen(PORT, () => console.log(`Server started at ${PORT} port`));
};
bootstrap();
