import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

describe('PaymentController', () => {
  let controller: PaymentController;

  const paymentServiceMock = {
    getPresaleSignature: jest.fn(),
    handleWebhook: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [{ provide: PaymentService, useValue: paymentServiceMock }],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delegate the webhook to the service', () => {
    const body = { data: {} };
    controller.handleWompiWebhook(body);
    expect(paymentServiceMock.handleWebhook).toHaveBeenCalledWith(body);
  });
});
