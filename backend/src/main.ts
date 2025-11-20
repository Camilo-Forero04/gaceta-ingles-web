import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors({
    origin: 'https://gacetaingles.com', // Ya que el frontend está en el dominio real
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 👇 EL CAMBIO CRÍTICO: Escuchar en 0.0.0.0 para que Railway pueda entrar
  await app.listen(process.env.PORT || 4000, '0.0.0.0'); 
}
bootstrap();