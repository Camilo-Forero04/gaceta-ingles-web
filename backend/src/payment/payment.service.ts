import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma.service';
import { Resend } from 'resend';

@Injectable()
export class PaymentService {
  private resend: Resend;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  public getPresaleSignature() {
    const currency = 'COP';
    const priceInCents = 2670000; 
    const reference = `GACETA-${Date.now()}`; 

    // ☢️ ZONA NUCLEAR: Pegamos las llaves reales aquí directo
    // (Asegúrate de que queden dentro de las comillas)
    
    const integritySecret = "prod_integrity_cqVlvM0EZ6PvlxXT15twJDlany5NOgAB"; 
    const publicKey = "pub_prod_Wcu7XrFi4wzelvB4V7cLKhMW63dNyj0K";

    // ---------------------------------------------------------

    // Limpieza paranoica (por si pegaste espacios sin querer)
    const cleanSecret = integritySecret.trim();
    const cleanPublic = publicKey.trim();

    // Crear cadena
    const chain = `${reference}${priceInCents}${currency}${cleanSecret}`;

    console.log("------------------------------------------------");
    console.log("🔎 CADENA QUE ESTOY FIRMANDO:", chain);
  
    // Encriptar
    const signature = crypto.createHash('sha256').update(chain).digest('hex');

    console.log("🔐 FIRMANDO CON:", cleanSecret.substring(0, 10) + "..."); // Para ver en logs

    return {
      reference,
      amountInCents: priceInCents,
      currency,
      signature,
      publicKey: cleanPublic
    };
  }

  async handleWebhook(event: any) {
    const transaction = event?.data?.transaction;

    if (!transaction) return { status: 'Ignored (No data)' };

    // 4. VALIDACIÓN REAL
    if (transaction.status === 'APPROVED') {
        console.log(`💰 VENTA REAL Aprobada: ${transaction.customer_email}`);
        
        try {
            const existingOrder = await this.prisma.order.findUnique({
                where: { wompiReference: transaction.reference }
            });

            if (!existingOrder) {
                await this.prisma.order.create({
                    data: {
                        customerEmail: transaction.customer_email,
                        wompiReference: transaction.reference,
                        wompiTransactionId: transaction.id,
                        amount: transaction.amount_in_cents,
                        status: 'APPROVED',
                        isDelivered: false,
                    },
                });
                
                // Enviar Correo
                await this.sendWelcomeEmail(transaction.customer_email);
            }
            return { success: true };

        } catch (error) {
            console.error('Error procesando orden:', error);
            return { success: false, error: error.message };
        }
    }
    return { status: 'Ignored (Not Approved)' };
  }

  private async sendWelcomeEmail(email: string) {
    try {
        await this.resend.emails.send({
            from: 'La Gaceta del Inglés <info@gacetaingles.com>',
            reply_to: 'info.gaceta.ingles@gmail.com',
            to: [email],
            subject: '🇬🇧 ¡Tu cupo está asegurado! - La Gaceta del Inglés',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                <h1 style="color: #4F46E5;">¡Gracias por tu compra! 🚀</h1>
                <p>Hola,</p>
                <p>Confirmamos que tu pago ha sido exitoso. Ya eres parte de <strong>La Gaceta del Inglés</strong>.</p>
                <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 0 0 10px 0;"><strong>📅 Entrega del eBook:</strong> 15 de Diciembre, 2025</p>
                  <p style="margin: 0;">Te enviaremos el enlace de descarga aquí mismo.</p>
                </div>
              </div>
            `,
        } as any);
    } catch (error) {
        console.error('❌ Error enviando correo:', error);
    }
  }
}