import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // HABILITAR CORS: Esto permite que Next.js (3000) reciba datos de NestJS (4000)
  app.enableCors({
    origin: 'http://localhost:3000', // Solo permitimos a tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(4000);
  console.log(`🚀 Servidor corriendo en puerto 4000`);
}
bootstrap();