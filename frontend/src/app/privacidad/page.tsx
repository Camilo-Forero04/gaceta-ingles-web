import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de tratamiento de datos personales de La Gaceta del Inglés.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-slate-700 leading-relaxed">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Política de Privacidad</h1>
      <p className="text-sm text-slate-400 mb-10">Última actualización: julio de 2026</p>

      <section className="space-y-6 text-base">
        <p>
          En <strong>La Gaceta del Inglés</strong> (en adelante, &quot;nosotros&quot;) respetamos tu
          privacidad y protegemos tus datos personales conforme a la Ley 1581 de 2012 (Habeas Data)
          y el Decreto 1377 de 2013 de la República de Colombia.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">1. Datos que recolectamos</h2>
        <p>
          Al realizar una compra recolectamos tu nombre, correo electrónico y la información de la
          transacción procesada por Wompi (Bancolombia). No almacenamos datos de tarjetas de
          crédito ni credenciales bancarias: el pago es procesado íntegramente por Wompi.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">2. Finalidad del tratamiento</h2>
        <p>
          Usamos tus datos para: entregar el producto digital adquirido, enviarte la confirmación
          de compra y comunicaciones relacionadas con tu pedido, darte acceso a los bonus
          (comunidad de WhatsApp), y medir el rendimiento de nuestras campañas publicitarias
          mediante herramientas como Meta Pixel y la API de Conversiones de Meta.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">3. Cookies y tecnologías de seguimiento</h2>
        <p>
          Este sitio utiliza cookies y píxeles de seguimiento (Meta Pixel) para fines analíticos y
          publicitarios. Puedes gestionar o bloquear las cookies desde la configuración de tu
          navegador.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">4. Compartición de datos</h2>
        <p>
          Compartimos datos únicamente con los proveedores necesarios para operar el servicio:
          Wompi (procesamiento de pagos), Resend (correos transaccionales), Meta Platforms
          (medición publicitaria) y nuestros proveedores de infraestructura. Nunca vendemos tus
          datos a terceros.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">5. Tus derechos</h2>
        <p>
          Como titular de los datos puedes conocer, actualizar, rectificar y solicitar la supresión
          de tu información, así como revocar la autorización otorgada. Para ejercer estos derechos
          escríbenos a{" "}
          <a href="mailto:info.gaceta.ingles@gmail.com" className="text-indigo-600 hover:underline">
            info.gaceta.ingles@gmail.com
          </a>
          .
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">6. Seguridad y conservación</h2>
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger tu información.
          Conservamos los datos de las órdenes durante el tiempo necesario para cumplir
          obligaciones legales, contables y fiscales.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">7. Cambios a esta política</h2>
        <p>
          Podemos actualizar esta política ocasionalmente. Publicaremos cualquier cambio en esta
          misma página con la fecha de actualización.
        </p>
      </section>
    </div>
  );
}
