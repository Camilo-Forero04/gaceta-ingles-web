import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma.service';
import { Resend } from 'resend';
import * as bizSdk from 'facebook-nodejs-business-sdk';

// Precio única fuente de verdad del backend
const PRICE_IN_CENTS = 4900000; // $49.000 COP

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private resend: Resend;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  /**
   * Verifica la firma (checksum) del evento según la documentación de Wompi:
   * SHA-256( valores de signature.properties + timestamp + secreto de eventos )
   */
  private verifyEventSignature(event: any): boolean {
    const eventsSecret = this.configService.get<string>('WOMPI_EVENTS_SECRET');
    if (!eventsSecret) {
      this.logger.error('WOMPI_EVENTS_SECRET no está configurado');
      return false;
    }

    const checksum: string | undefined = event?.signature?.checksum;
    const properties: string[] = event?.signature?.properties;
    const timestamp = event?.timestamp;

    if (!checksum || !Array.isArray(properties) || timestamp === undefined) {
      return false;
    }

    // Concatenar los valores indicados en signature.properties (ej: "transaction.id")
    const concatenated = properties
      .map((prop) =>
        prop.split('.').reduce((obj: any, key: string) => obj?.[key], event.data),
      )
      .join('');

    const computed = crypto
      .createHash('sha256')
      .update(`${concatenated}${timestamp}${eventsSecret.trim()}`)
      .digest('hex');

    return computed.toLowerCase() === String(checksum).toLowerCase();
  }

  public getPresaleSignature() {
    const currency = 'COP';
    const priceInCents = PRICE_IN_CENTS;
    const reference = `GACETA-${Date.now()}`;

    const integritySecret = this.configService.get<string>('WOMPI_INTEGRITY_SECRET');
    const publicKey = this.configService.get<string>('WOMPI_PUB_KEY');

    if (!integritySecret || !publicKey) {
      this.logger.error('Faltan llaves de Wompi en las variables de entorno');
      throw new InternalServerErrorException('Configuración de pagos incompleta');
    }

    const cleanSecret = integritySecret.trim();
    const cleanPublic = publicKey.trim();

    const chain = `${reference}${priceInCents}${currency}${cleanSecret}`;
    const signature = crypto.createHash('sha256').update(chain).digest('hex');

    return {
      reference,
      amountInCents: priceInCents,
      currency,
      signature,
      publicKey: cleanPublic
    };
  }

  async handleWebhook(event: any) {
    // 1. Verificar autenticidad del evento (evita ventas falsificadas)
    if (!this.verifyEventSignature(event)) {
      this.logger.warn('Webhook rechazado: firma inválida');
      throw new UnauthorizedException('Firma de evento inválida');
    }

    const transaction = event?.data?.transaction;
    if (!transaction) return { status: 'Ignored (No data)' };

    if (transaction.status !== 'APPROVED') {
      return { status: 'Ignored (Not Approved)' };
    }

    // 2. Validar que el monto pagado corresponda al precio real
    if (transaction.amount_in_cents !== PRICE_IN_CENTS) {
      this.logger.warn(
        `Webhook rechazado: monto inesperado (${transaction.amount_in_cents}) en ref ${transaction.reference}`,
      );
      return { status: 'Ignored (Amount mismatch)' };
    }

    this.logger.log(`Venta aprobada: ref ${transaction.reference}`);

    try {
      // 3. Crear la orden de forma atómica.
      // Si Wompi reenvía el evento, el índice único lanza P2002 y no duplicamos correo/CAPI.
      await this.prisma.order.create({
        data: {
          customerEmail: transaction.customer_email,
          customerName: transaction.customer_data?.full_name ?? null,
          wompiReference: transaction.reference,
          wompiTransactionId: transaction.id,
          amount: transaction.amount_in_cents,
          status: 'APPROVED',
          isDelivered: false,
        },
      });
      this.logger.log(`Orden guardada: ref ${transaction.reference}`);

      // 4. Acciones secundarias en paralelo (fallos aquí no revierten la orden)
      await Promise.all([
        this.sendWelcomeEmail(transaction.customer_email),
        this.sendFacebookEvent(transaction),
      ]);

      return { success: true };
    } catch (error) {
      if (error?.code === 'P2002') {
        // Evento duplicado de Wompi: la orden ya existe, todo bien.
        return { status: 'Ignored (Duplicate event)' };
      }
      this.logger.error(`Error procesando orden ref ${transaction.reference}`, error?.stack);
      // 5xx para que Wompi reintente la entrega del evento
      throw new InternalServerErrorException('Error procesando la orden');
    }
  }

  // --- FUNCIÓN DE CORREO ---
private async sendWelcomeEmail(email: string) {
  const whatsappGroupUrl =
    this.configService.get<string>('WHATSAPP_GROUP_URL') ??
    'https://chat.whatsapp.com/EIV75yl42Kq7sG7kMEYwIy';
  try {
      await this.resend.emails.send({
          from: 'La Gaceta del Inglés <info@gacetaingles.com>',
          replyTo: 'info.gaceta.ingles@gmail.com',
          to: [email],
          subject: '🎫 Tu Ticket VIP: Entra al Challenge de Speaking + Recibo',
          html: `
            <!DOCTYPE html>
            <html lang="es">
            <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px 20px; border-radius: 8px; color: #1f2937; line-height: 1.6;">
                
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #4F46E5; margin: 0; font-size: 28px; font-weight: 800;">¡Pago Exitoso! 🚀</h1>
                    <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">Confirmación de tu orden</p>
                </div>

                <p style="font-size: 16px;">Hola,</p>
                <p style="font-size: 16px;">¡Te confirmamos que tu pago ha sido procesado correctamente! Ya tienes asegurada tu copia de <strong>"Desbloquea tu Fluidez"</strong>.</p>
                
                <div style="background-color: #fffbeb; border-left: 5px solid #f59e0b; padding: 20px; margin: 25px 0; border-radius: 4px;">
                    <p style="margin: 0; font-weight: bold; color: #92400e; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">TU FLUIDEZ EMPIEZA HOY MISMO...</p>
                    <p style="margin: 8px 0 0 0; font-size: 16px; color: #78350f;">El libro digital está en camino, pero tu práctica real empieza <strong>ahora mismo</strong>.</p>
                </div>

                <p style="font-size: 16px;">Como parte de tu bonus exclusivo, tienes acceso inmediato a nuestro <strong>Grupo VIP de WhatsApp</strong> para el Speaking Challenge de 20 días.</p>

                <div style="text-align: center; margin: 40px 0;">
                    <h3 style="margin-bottom: 20px; font-size: 18px; color: #111827;">👇 TU MISIÓN DE HOY:</h3>
                    
                    <a href="${whatsappGroupUrl}"
                       style="background-color: #25D366; color: white; padding: 18px 35px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 18px; display: inline-block; box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3);">
                         👉 ENTRAR AL GRUPO DE WHATSAPP
                    </a>
                    
                    <p style="font-size: 12px; color: #9ca3af; margin-top: 15px;">(Si el botón no funciona, responde a este correo)</p>
                </div>

                <div style="background-color: #f8fafc; border: 2px dashed #cbd5e1; padding: 20px; border-radius: 12px; margin-bottom: 35px; text-align: left;">
                    <p style="margin: 0; font-size: 15px; color: #334155;">
                        <strong>🎙️ Una vez dentro, preséntate:</strong><br><br>
                        Envía un audio de 10 segundos diciendo tu nombre y por qué quieres aprender inglés. (¡Sí, en inglés! Sin miedo, estamos en zona segura).
                    </p>
                </div>

                <div style="background-color: #EEF2FF; padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid #e0e7ff;">
                  <h3 style="margin: 0 0 15px 0; color: #4F46E5; font-size: 15px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">📋 Resumen de tu Pedido</h3>
                  <ul style="padding-left: 20px; margin: 0; list-style-type: circle; color: #374151;">
                    <li style="margin-bottom: 10px;"><strong>Producto:</strong> eBook "Desbloquea tu Fluidez"</li>
                    <li style="margin-bottom: 10px;"><strong>Bonus:</strong> Acceso al Speaking Challenge de WhatsApp (Entregado arriba 👆)</li>
                    <li><strong>Entrega del eBook:</strong> Muy pronto <br><span style="font-size: 13px; color: #6b7280;">(Te llegará el enlace de descarga a este mismo correo)</span>.</li>
                  </ul>
                </div>

                <p style="margin-top: 30px; font-size: 16px;">¡Nos vemos dentro del grupo!</p>
                <p style="color: #6b7280; font-style: italic;">El equipo de La Gaceta del Inglés</p>
                
                <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #9ca3af;">
                    © 2026 La Gaceta del Inglés. Todos los derechos reservados.<br>Hecho con ❤️ en Colombia.
                </div>
              </div>
            </body>
            </html>
          `,
      });
      this.logger.log('Correo de bienvenida enviado');
  } catch (error) {
      this.logger.error('Error enviando correo de bienvenida', error?.stack);
  }
}

  // --- FUNCIÓN DE FACEBOOK CAPI ---
  private async sendFacebookEvent(transaction: any) {
    try {
        const accessToken = this.configService.get<string>('FACEBOOK_ACCESS_TOKEN');
        const pixelId = this.configService.get<string>('FACEBOOK_PIXEL_ID');

        if (!accessToken || !pixelId) {
            this.logger.warn('Falta configurar Facebook CAPI en .env');
            return;
        }

        const Content = bizSdk.Content;
        const CustomData = bizSdk.CustomData;
        const EventRequest = bizSdk.EventRequest;
        const UserData = bizSdk.UserData;
        const ServerEvent = bizSdk.ServerEvent;

        bizSdk.FacebookAdsApi.init(accessToken);

        const userData = new UserData()
            .setEmail(transaction.customer_email)
            .setClientIpAddress(transaction.redirect_url ? '0.0.0.0' : undefined);

        const customData = new CustomData()
            .setValue(transaction.amount_in_cents / 100)
            .setCurrency('COP')
            .setContentName('La Gaceta del Inglés - Desbloquea tu Fluidez');

        const serverEvent = new ServerEvent()
            .setEventName('Purchase')
            .setEventTime(Math.floor(new Date().getTime() / 1000))
            .setUserData(userData)
            .setCustomData(customData)
            .setEventSourceUrl('https://gacetaingles.com')
            .setActionSource('website')
            .setEventId(transaction.id); 

        const eventRequest = new EventRequest(accessToken, pixelId).setEvents([serverEvent]);
        await eventRequest.execute();
        this.logger.log('Evento Purchase enviado a Facebook CAPI');

    } catch (error) {
        this.logger.error('Error enviando a Facebook CAPI', error?.stack);
    }
  }
}