"use client";

import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
import { usePathname, useSearchParams } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "1369127641335121";

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Inicializar el Pixel
    ReactPixel.init(PIXEL_ID, undefined, {
      autoConfig: true,
      debug: false, // Pon true si quieres ver logs en la consola
    });

    // 2. Registrar la primera visita (PageView)
    ReactPixel.pageView();
  }, []);

  // 3. Rastrear cambios de página (si el usuario navega dentro de la app)
  useEffect(() => {
    ReactPixel.pageView();
  }, [pathname, searchParams]);

  return null; // Este componente no renderiza nada visual
}