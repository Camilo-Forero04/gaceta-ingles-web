import { Body, Controller, Get, Post } from '@nestjs/common'; // <--- Agrega Body y Post
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('presale-info')
  getPresaleInfo() {
    return this.paymentService.getPresaleSignature();
  }

  // ESTO ES NUEVO: Escuchamos a Wompi
  @Post('webhook')
  handleWompiWebhook(@Body() body: any) {
    console.log('🔔 Webhook recibido de Wompi:', body?.data?.transaction?.status);
    return this.paymentService.handleWebhook(body);
  }
}