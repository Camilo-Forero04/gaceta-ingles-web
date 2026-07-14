"use client";

import { useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://gaceta-ingles-web-production.up.railway.app";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gacetaingles.com";

/**
 * Hook compartido para iniciar el checkout de Wompi.
 * Única fuente de la lógica de pago (usada por PresaleHero y Navbar).
 */
export function useWompiCheckout(source: string = "default") {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      // 1. Obtener firma y precio desde el backend (única fuente del precio)
      const response = await fetch(`${API_URL}/payment/presale-info`);
      if (!response.ok) throw new Error("Error conectando con el servidor de pagos");
      const data = await response.json();

      // 2. Trackear InitiateCheckout con el precio real del backend
      try {
        const ReactPixel = (await import("react-facebook-pixel")).default;
        ReactPixel.track("InitiateCheckout", {
          currency: data.currency ?? "COP",
          value: Number(data.amountInCents) / 100,
          content_name: `La Gaceta del Inglés - Desbloquea tu Fluidez (${source})`,
        });
      } catch {
        // El tracking nunca debe bloquear la venta
      }

      // 3. Abrir el widget de Wompi
      if (typeof (window as any).WidgetCheckout !== "undefined") {
        const checkout = new (window as any).WidgetCheckout({
          currency: data.currency ?? "COP",
          amountInCents: Number(data.amountInCents),
          reference: data.reference,
          publicKey: data.publicKey,
          signature: { integrity: data.signature },
          redirectUrl: `${SITE_URL}/pago-exitoso`,
          taxInCents: { vat: 0, consumption: 0 },
        });

        checkout.open((result: any) => {
          const transaction = result?.transaction;
          if (transaction?.status === "APPROVED") {
            window.location.href = `/pago-exitoso?id=${transaction.id}`;
          }
        });
      } else {
        alert("El sistema de pagos está cargando. Intenta de nuevo en 2 segundos.");
      }
    } catch (e) {
      console.error(e);
      alert("Hubo un error al iniciar el pago. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handlePurchase, isLoading };
}
