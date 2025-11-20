import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // <--- Importar esto
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // <--- Agregar esta línea
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}