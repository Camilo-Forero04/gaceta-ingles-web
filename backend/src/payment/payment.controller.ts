import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('presale-info')
  getPresaleInfo() {
    return this.paymentService.getPresaleSignature();
  }

  // Webhook de eventos de Wompi
  @Post('webhook')
  @HttpCode(200) // Wompi espera 200 en caso de éxito
  handleWompiWebhook(@Body() body: any) {
    return this.paymentService.handleWebhook(body);
  }
}
