import React, { useEffect, useRef } from "react";
import scrollIntoView from "scroll-into-view";


export default function BonusResumen() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add("animate-fade-slide");
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className=" md:px-8 lg:px-16 opacity-0 transition-all duration-1000  text-dark px-6 font-poppins text-center bg-cover bg-center bg-no-repeat py-10 sm:py-16 md:py-20"
            style={{ backgroundImage: "url('/bg.jpg')" }}

    >
      <h3 className="text-3xl italic mb-8">
        Un resumen de todo lo que recibirás...
      </h3>

      <div className="flex justify-center mb-10">
        <img
          src="/images/bono-resumen.png"
          alt="Resumen Éxito en un Pote"
          width={800}
          height={600}
          className="w-full max-w-5xl h-auto rounded-lg shadow-lg"
        />
      </div>

      <h4 className="text-2xl md:text-3xl font-bold mb-4">
        Acceso de por vida a <span className="text-primary">#ÉxitoEnUnPote 2.0</span> y los{" "}
        <span className="bg-cyan-300 text-black px-2">7 BONOS totalmente gratis</span>
      </h4>

      <div className="text-left max-w-4xl mx-auto mt-8 space-y-4 text-lg leading-relaxed">
        <p>
          <span className="font-bold text-purple-700">BONO #1:</span> <strong> "Lista de proveedores confiables (de todo el mundo)"</strong>
          <br />
          <span>Para que no pierdas tiempo buscando dónde comprar.</span>
        </p>
        <p>
          <span className="font-bold text-purple-700">BONO #2:</span>  <strong>"Empaques sostenibles y presentaciones que enamoran"</strong>
          <br />
          <span>Vendé más con una presentación consciente y profesional.</span>
        </p>
        <p>
          <span className="font-bold text-purple-700">BONO #3:</span> <strong>"Tu negocio de Lip Gloss"</strong>
          <br />
          <span>Una línea de productos con bajo costo y alta rotación.</span>
        </p>
        <p>
          <span className="font-bold text-purple-700">BONO #4:</span> <strong>"Aromaterapia y aceites esenciales"</strong>
          <br />
          <span>Aprendé a formular con intención y sentido.</span>
        </p>
        <p>
          <span className="font-bold text-purple-700">BONO #5:</span> <strong>"Oleados y macerados naturales"</strong>
          <br />
          <span>Extraé principios activos como una experta.</span>
        </p>
        <p>
          <span className="font-bold text-purple-700">BONO #6:</span> <strong>"K-Beauty natural: secretos de la cosmética coreana"</strong>
          <br />
          <span>Rutinas, ingredientes y fórmulas inspiradas en la tendencia que arrasa.</span>
        </p>
        <p>
          <span className="font-bold text-purple-700">BONO #7:</span> <strong>"Más allá de los miedos: Técnicas emocionales para emprender sin rendirte"</strong>
          <br />
          <span>Herramientas que te sostienen cuando aparecen los miedos.</span>
        </p>

        <p className="mt-8 font-bold italic text-black">
          #Acompañamiento real: Grupo exclusivo de WhatsApp para que no lo hagas sola/o.
          Respondemos tus dudas, te apoyamos y celebramos cada paso con vos.
        </p>

        <p className="italic font-bold text-black">
          #Todo acompañado de videos paso a paso, materiales descargables y acceso de por vida.
        </p>
      </div>

      <div className="mt-12 text-center">
        <p className="text-2xl md:text-2xl font-bold mb-2 text-red-700 line-through">
          De $120 USD
        </p>
        <p className="text-3xl md:text-4xl font-extrabold text-black-600">
          AHORA SÓLO
        </p>
        <p className="text-6xl md:text-8xl font-extrabold text-green-600">
          $67.00
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Haz clic para ver el precio en tu moneda local
        </p>
        
        <div className="mt-5 flex justify-center order-3 md:order-3">
            <button
              onClick={() => {
                const el = document.getElementById("inscripcion");
                if (el) {
                  scrollIntoView(el, {
                    time: 1000,
                    align: { top: 0, topOffset: 80 },
                  });
                }
              }}
              className="bg-accent text-white font-bold text-2xl md:text-4xl px-11 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
            >
                       ORDENAR AHORA

            </button>
          </div>
        <p className="text-xs text-red-600 mt-2">
          (ATENCIÓN: Precio especial por lanzamiento, pronto aumenta a $120 USD, ¡Asegura tu cupo ahora!)
        </p>
      </div>
    </section>
  );
}
