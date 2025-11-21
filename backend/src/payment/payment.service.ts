import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma.service';
import { Resend } from 'resend'; // Importamos la librería

@Injectable()
export class PaymentService {
  private resend: Resend;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) {
    // Inicializamos Resend con la llave que pusiste en el .env
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  public getPresaleSignature() {
    // 1. Definir constantes
    const currency = 'COP';
    const priceInCents = 2670000; 
    
    // NOTA: Para producción, recuerda cambiar esto a algo dinámico o usar Date.now()
    // en el Frontend también para que coincidan siempre.
    const reference = `PRUEBA-FINAL-GACETA-${Date.now()}`; 

    // 3. LLAVES DIRECTAS (Cuando tengas las de producción, cámbialas por this.configService.get...)
    const integritySecret = "test_integrity_uUO9v08W8CbDyznZN1QqPpu2WnpoZcbM"; 
    const publicKey = "pub_test_xhmYBhoyJuKSiW2ROTm1OQLSrTAMCeBH";

    // 4. Construir la cadena
    const chain = reference + priceInCents.toString() + currency + integritySecret;

    // 5. Generar Hash
    const signature = crypto.createHash('sha256').update(chain).digest('hex');

    return {
      reference: reference,
      amountInCents: priceInCents,
      currency: currency,
      signature: signature,
      publicKey: publicKey
    };
  }

  // --- MANEJO DEL WEBHOOK (Pago Real + Simulación) ---
  async handleWebhook(event: any) {
    const transaction = event?.data?.transaction;

    if (!transaction) return { status: 'Ignored (No data)' };

    // LÓGICA UNIFICADA:
    // Aprobamos si Wompi dice "APPROVED" O si es tu simulación "TEST-DEV"
    const isApproved = transaction.status === 'APPROVED' || transaction.reference.startsWith("TEST-DEV");

    if (isApproved) {
        console.log(`✅ Pago Aprobado/Simulado para: ${transaction.customer_email}`);
        
        try {
            // 1. Evitar duplicados: Revisamos si ya existe esta referencia en la DB
            const existingOrder = await this.prisma.order.findUnique({
                where: { wompiReference: transaction.reference }
            });

            // Solo guardamos y enviamos correo si NO existe
            if (!existingOrder) {
                // A. Guardar en Supabase
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
                console.log('💾 Orden guardada en Supabase');

                // B. ENVIAR CORREO CON RESEND 📧
                await this.sendWelcomeEmail(transaction.customer_email);
            } else {
                console.log('⚠️ La orden ya existía, saltando guardado y correo.');
            }

            return { success: true };

        } catch (error) {
            console.error('Error procesando orden:', error);
            return { success: false, error: error.message };
        }
    }

    return { status: 'Ignored (Not Approved)' };
  }

  // --- FUNCIÓN PRIVADA PARA DISEÑAR Y ENVIAR EL EMAIL ---
  private async sendWelcomeEmail(email: string) {
    try {
        const data = await this.resend.emails.send({
        from: 'La Gaceta del Inglés <info@gacetaingles.com>',
        reply_to: 'info.gaceta.ingles@gmail.com', // <--- Coma importante aquí
        to: [email],
        subject: '🇬🇧 ¡Tu cupo está asegurado! - La Gaceta del Inglés',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h1 style="color: #4F46E5;">¡Bienvenido a la Preventa! 🚀</h1>
            <p>Hola,</p>
            <p>Confirmamos que tu pago ha sido exitoso. Ya tienes asegurada tu copia de <strong>"Desbloquea tu Fluidez"</strong>.</p>
            
            <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>📅 Fecha de Entrega:</strong> 15 de Diciembre, 2025</p>
              <p style="margin: 0;"><strong>📧 Medio de entrega:</strong> Te llegará un enlace de descarga directo a este correo.</p>
            </div>

            <p>Mientras tanto, gracias por confiar en este proyecto.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 12px; color: #888;"><em>Atentamente,<br>El equipo de La Gaceta del Inglés</em></p>
          </div>
        `,
    }as any);
        console.log('📧 Correo enviado exitosamente ID:', data.data?.id); 
    } catch (error) {
        console.error('❌ Error enviando correo:', error);
        // No lanzamos error aquí para no romper el flujo si el correo falla,
        // ya que lo importante es que la orden quedó guardada en la DB.
    }
  }
}