# Informe de auditoría — Gaceta del Inglés

Fecha: 2026-07-09 · Alcance: frontend (Next.js) + backend (NestJS/Prisma/Wompi)

> ✅ **Estado: TODOS los hallazgos fueron aplicados el 2026-07-09.**
> Pendientes de tu parte: (1) `npm install` en backend y frontend, (2) configurar `WOMPI_EVENTS_SECRET` en Railway (ver `backend/.env.example`), (3) revisar los textos de `/privacidad` y `/terminos` con un abogado si lo consideras.

---

## 🔴 Críticos (arreglar antes que nada)

### C1. El webhook de Wompi no verifica la firma del evento
`payment.service.ts → handleWebhook()` acepta cualquier POST. Cualquier persona puede enviar un JSON falso con `status: "APPROVED"` y recibir el correo con el acceso al grupo VIP, además de crear órdenes falsas en la base de datos y enviar eventos Purchase falsos a Meta (contamina la optimización de tus ads).
**Fix:** verificar `event.signature.checksum` con el secreto de eventos de Wompi (SHA-256 de `properties + timestamp + secret`) y rechazar con 403 si no coincide. También validar que `amount_in_cents` coincida con el precio esperado (2.670.000).

### C2. Redirección post-pago a una página que no existe (404)
El widget de Wompi redirige a `/gracias` (en `PresaleHero.tsx` y `Navbar.tsx`), pero la página real es `/pago-exitoso`. **Todo cliente que paga cae en un 404**: no ve confirmación y el evento Purchase del Pixel del navegador nunca se dispara.
**Fix:** cambiar a `/pago-exitoso` (o renombrar la carpeta a `gracias`), en `redirectUrl` y en `window.location.href`.

### C3. CTA principal del home apunta a `/libro` (404)
`HomeHero.tsx` y `FeaturedProducts.tsx` enlazan a `/libro`, pero la página de venta es `/ebook`. El botón principal del home está roto.

### C4. Fechas vencidas e inconsistentes (hoy es julio 2026)
- Contador de `PresaleHero`: termina el **16-ene-2026** (ya pasó) → muestra 0-0-0-0 con "¡La oferta termina pronto!" permanente. Destruye credibilidad.
- Email de bienvenida: "Entrega del eBook: **16 de Enero, 2026**".
- Página de éxito: "El **1 de Diciembre** recibirás el eBook".
Tres fechas distintas, todas en el pasado. **Fix:** una sola fecha real, definida en un solo lugar.

---

## 🟠 Altos

### A1. Navbar, Footer y WhatsAppButton duplicados en el home
`layout.tsx` ya los renderiza globalmente y `page.tsx` los vuelve a incluir → dos navbars y dos footers en `/`. Quitar los del `page.tsx`.

### A2. URL del backend y Pixel ID hardcodeados
`https://gaceta-ingles-web-production.up.railway.app` está quemada en 2 componentes y el Pixel ID en `FacebookPixel.tsx`. **Fix:** `NEXT_PUBLIC_API_URL` y `NEXT_PUBLIC_FB_PIXEL_ID` en `.env`, con un `.env.example` documentado.

### A3. Precio duplicado en 4 lugares
Backend (2670000), PresaleHero (26700), Navbar (26700), pago-exitoso (26700). Un cambio de precio requiere tocar 4 archivos y desincroniza la firma de Wompi con el Pixel. **Fix:** el backend es la única fuente; el frontend usa `amountInCents` de `/presale-info` para el tracking.

### A4. Lógica de pago copiada y pegada (Navbar y PresaleHero)
~60 líneas idénticas. **Fix:** extraer a un hook `useWompiCheckout()`.

### A5. Webhook: condición de carrera y respuestas incorrectas
`findUnique` + `create` no es atómico: dos entregas simultáneas del webhook pueden chocar con el índice único y saltarse el correo. **Fix:** usar `upsert` o capturar `P2002`. Además los errores devuelven 2xx con `{success:false}` — Wompi no reintenta; devolver 5xx en fallos reales.

### A6. Anclas rotas en la navegación
Navbar enlaza a `#metodo` (no existe id en `AcademyPillars`) y HomeHero a `#comunidad` (no existe). Además `#temario`/`#garantia` solo existen en `/ebook`, así que desde el home no llevan a ningún lado.

### A7. Enlaces legales del footer apuntan a `#`
Privacidad, términos, etc. no existen. Meta Ads exige política de privacidad válida en landing pages con Pixel; también es requisito de Habeas Data en Colombia. Crear al menos `/privacidad` y `/terminos`.

---

## 🟡 Medios

### M1. SEO casi inexistente
Solo `title` y `description` genéricos. Falta: `metadataBase`, Open Graph/Twitter cards (crucial: los enlaces compartidos en WhatsApp no muestran imagen), `robots.ts`, `sitemap.ts`, metadata propia para `/ebook`, y `<html lang="es">` sí está ✔.

### M2. Deduplicación del evento Purchase (Pixel vs CAPI)
El backend envía Purchase por CAPI con `event_id = transaction.id`; el navegador envía otro Purchase sin `eventID` → Meta cuenta ventas dobles. Además `/pago-exitoso` re-dispara Purchase en cada refresh. **Fix:** pasar el mismo `eventID` en el track del cliente y guardar un flag en `sessionStorage`.

### M3. Sin rate limiting ni validación en el backend
`@Body() body: any`, sin DTOs ni `ValidationPipe`, sin `@nestjs/throttler`. `/presale-info` puede ser bombardeado (cada llamada genera firma).

### M4. Logs con datos personales
Se loguean correos de clientes en texto plano (`console.log`). En Railway los logs quedan persistidos. Reducir a IDs de transacción y usar `Logger` de Nest.

### M5. `customerName` nunca se guarda y `isDelivered` no tiene flujo
El schema tiene ambos campos; Wompi envía `customer_data.full_name`. Aprovecharlos o quitarlos. `isDelivered` sugiere una entrega manual pendiente de automatizar para el día del lanzamiento.

### M6. Dependencias inconsistentes en frontend
`@tailwindcss/postcss` v4 instalada pero se usa Tailwind v3 (desinstalar la v4). Clases `animate-in fade-in` y `animate-pulse-subtle` no existen en la config → no hacen nada. `critters` ya está deprecado (usar `beasties` si mantienes `optimizeCss`).

### M7. `<img>` en vez de `next/image` en el placeholder del libro
Es el LCP de `/ebook`. Con `next/image` + `priority` mejora Core Web Vitals.

### M8. CORS sin entorno de desarrollo
Solo permite el dominio de producción; en local el frontend no puede llamar al backend. Permitir `http://localhost:3000` según `NODE_ENV`.

### M9. Email: `reply_to` con cast `as any`
Resend v6 usa `replyTo`. El cast oculta el error de tipo y probablemente el reply-to no se está aplicando.

---

## 🟢 Menores

- `console.log` de debug en producción (frontend y backend).
- Comentarios de tutorial en el código ("AQUÍ ESTÁ EL CÓDIGO FINAL", "Lo crearemos ahora") — limpiar.
- Título de pestaña: "La Gaceta del Inglés - Preventa" aparece en todas las páginas; usar `title.template`.
- El endpoint raíz devuelve "Hello World!" — convertirlo en health check (`{status:'ok'}`).
- Tests generados por Nest CLI sin adaptar (los `.spec.ts` prueban "Hello World").
- Enlace del grupo de WhatsApp quemado en el HTML del email → variable de entorno (si el enlace se invalida hay que redeployar).

---

## Orden sugerido de ejecución

1. **C2 + C3** (rutas rotas — 15 min, recupera ventas perdidas hoy mismo)
2. **C4** (fechas — decisión tuya sobre la fecha real)
3. **C1** (firma del webhook — seguridad)
4. **A1–A7** (limpieza estructural)
5. **M1, M2, M7** (SEO + tracking + performance)
6. Resto de medios y menores

Dime cuáles apruebas y los aplico directamente.
