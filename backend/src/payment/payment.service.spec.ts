import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma.service';

describe('PaymentService', () => {
  let service: PaymentService;

  const configMock = {
    get: jest.fn((key: string) => {
      const values: Record<string, string> = {
        WOMPI_PUB_KEY: 'pub_test_123',
        WOMPI_INTEGRITY_SECRET: 'test_integrity_secret',
        WOMPI_EVENTS_SECRET: 'test_events_secret',
        RESEND_API_KEY: 're_test',
      };
      return values[key];
    }),
  };

  const prismaMock = {
    order: { create: jest.fn() },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: ConfigService, useValue: configMock },
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a valid signature payload', () => {
    const info = service.getPresaleSignature();
    expect(info.amountInCents).toBe(4900000);
    expect(info.currency).toBe('COP');
    expect(info.reference).toMatch(/^GACETA-/);
    expect(info.signature).toHaveLength(64); // SHA-256 hex
    expect(info.publicKey).toBe('pub_test_123');
  });

  it('should reject webhooks with invalid signature', async () => {
    await expect(
      service.handleWebhook({
        data: { transaction: { status: 'APPROVED' } },
        signature: { checksum: 'invalid', properties: ['transaction.id'] },
        timestamp: 123,
      }),
    ).rejects.toThrow('Firma de evento inválida');
    expect(prismaMock.order.create).not.toHaveBeenCalled();
  });
});
