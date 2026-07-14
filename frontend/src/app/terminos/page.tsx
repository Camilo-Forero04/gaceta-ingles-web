import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de compra y uso de La Gaceta del Inglés.",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-slate-700 leading-relaxed">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Términos y Condiciones</h1>
      <p className="text-sm text-slate-400 mb-10">Última actualización: julio de 2026</p>

      <section className="space-y-6 text-base">
        <h2 className="text-xl font-bold text-slate-900 pt-4">1. El producto</h2>
        <p>
          El eBook <strong>&quot;Desbloquea tu Fluidez&quot;</strong> es un producto digital
          descargable. Al completar la compra recibirás en tu correo la confirmación y,
          posteriormente, el enlace de descarga, junto con el acceso al bonus del Speaking
          Challenge por WhatsApp.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">2. Precio y pago</h2>
        <p>
          El precio se muestra en pesos colombianos (COP) e incluye los impuestos aplicables. Los
          pagos son procesados de forma segura por Wompi (Bancolombia). No almacenamos información
          de tus medios de pago.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">3. Garantía y reembolsos</h2>
        <p>
          Ofrecemos una garantía de satisfacción: si el contenido del libro no cumple tus
          expectativas, te devolvemos el 100% de tu dinero. Para solicitarla escríbenos a{" "}
          <a href="mailto:info.gaceta.ingles@gmail.com" className="text-indigo-600 hover:underline">
            info.gaceta.ingles@gmail.com
          </a>{" "}
          indicando la referencia de tu compra. Esto no limita tu derecho de retracto conforme a la
          Ley 1480 de 2011 (Estatuto del Consumidor).
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">4. Propiedad intelectual</h2>
        <p>
          El eBook y todos los materiales asociados están protegidos por derechos de autor. La
          compra otorga una licencia de uso personal e intransferible. Está prohibida su
          reproducción, distribución o reventa sin autorización escrita.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">5. Uso de la comunidad</h2>
        <p>
          El acceso al grupo de WhatsApp es un bonus de cortesía. Nos reservamos el derecho de
          retirar del grupo a quien incumpla las normas básicas de respeto y convivencia.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">6. Limitación de responsabilidad</h2>
        <p>
          El contenido tiene fines educativos. Los resultados de aprendizaje dependen de la
          práctica y dedicación de cada persona, por lo que no garantizamos resultados específicos.
        </p>

        <h2 className="text-xl font-bold text-slate-900 pt-4">7. Contacto</h2>
        <p>
          Para cualquier duda sobre estos términos escríbenos a{" "}
          <a href="mailto:info.gaceta.ingles@gmail.com" className="text-indigo-600 hover:underline">
            info.gaceta.ingles@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
