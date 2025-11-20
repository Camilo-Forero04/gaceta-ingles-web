import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PrismaService } from '../prisma.service'; // <--- Importar

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService], // <--- Agregar aquí
})
export class PaymentModule {}