import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 👇 AQUÍ ESTÁ EL CÓDIGO FINAL DE CORS
  app.enableCors({
    origin: 'https://gacetaingles.com', // <--- DEBE SER HTTPS Y TU DOMINIO REAL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT || 4000, '0.0.0.0'); 
}
bootstrap();