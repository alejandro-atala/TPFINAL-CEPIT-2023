
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Configura CORS aquí
  app.enableCors({
    origin: 'http://localhost:3001', // Cambia esta URL al dominio del frontend
    credentials: true, // Habilita las credenciales (cookies, encabezados de autenticación, etc.)
  });

  await app.listen(3000);
}
bootstrap();
