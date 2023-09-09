
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Configura CORS aquí
  app.enableCors({
    origin: 'http://localhost:3001', // Cambia esta URL al dominio del frontend
    credentials: true, // Habilita las credenciales (cookies, encabezados de autenticación, etc.)
  });

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


  await app.listen(3000);
}
bootstrap();
