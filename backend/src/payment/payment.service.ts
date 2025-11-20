import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma.service'; // <--- Importar

@Injectable()
export class PaymentService {
  // Inyectamos PrismaService
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService 
  ) {}

public getPresaleSignature() {
    // 1. Definir constantes
    const currency = 'COP';
    const priceInCents = 2670000; // Entero directo
    
    // 2. Referencia simple para probar (sin fechas locas para evitar desincronización)
    // ALERTA: Cada vez que pruebes, cambia este numerito final (test-01, test-02...)
    // Wompi no deja repetir referencias pagadas.
    const reference = `PRUEBA-FINAL-GACETA-001`; 

    // 3. LLAVES DIRECTAS (Hardcoded para descartar .env)
    const integritySecret = "test_integrity_uUO9v08W8CbDyznZN1QqPpu2WnpoZcbM"; 
    const publicKey = "pub_test_xhmYBhoyJuKSiW2ROTm1OQLSrTAMCeBH";

    // 4. Construir la cadena EXACTA
    // Concatenamos todo como texto. 
    // Ejemplo: "PRUEBA-FINAL-GACETA-001" + "2670000" + "COP" + "test_integrity_..."
    const chain = reference + priceInCents.toString() + currency + integritySecret;

    // 5. Generar Hash
    const signature = crypto.createHash('sha256').update(chain).digest('hex');

    console.log("------------------------------------------------");
    console.log("🕵️‍♂️ DIAGNÓSTICO DE FIRMA WOMPI");
    console.log("1. Referencia:", reference);
    console.log("2. Monto:", priceInCents);
    console.log("3. Moneda:", currency);
    console.log("4. Secreto (primeros 5):", integritySecret.substring(0, 5) + "...");
    console.log("5. CADENA COMPLETA:", chain);
    console.log("6. HASH GENERADO:", signature);
    console.log("------------------------------------------------");

    return {
      reference: reference,
      amountInCents: priceInCents, // Enviamos como número
      currency: currency,
      signature: signature,
      publicKey: publicKey
    };
  }

// ... imports ...

  // 1. Agrega esta función si no la tenías, o úsala dentro de tu lógica
  async handleWebhook(event: any) {
    const transaction = event?.data?.transaction;

    if (!transaction) return { status: 'Ignored' };

    // --- 🔓 BYPASS DE DESARROLLADOR (La Puerta Trasera) ---
    // Si la referencia empieza por "TEST-DEV", aprobamos sin preguntar a Wompi
    if (transaction.reference.startsWith("TEST-DEV")) {
        console.log("⚠️ MODO DEV: Simulando aprobación de pago...");
        
        // Guardamos directo en Supabase
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
        console.log("✅ [MOCK] Orden guardada en Supabase exitosamente");
        return { success: true };
    }
    // -----------------------------------------------------

    // ... Aquí sigue tu lógica normal de validación de firma real ...
    // ...
  }
}