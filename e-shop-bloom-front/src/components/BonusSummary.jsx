import React, { useEffect, useRef } from "react";

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
      className=" md:px-8 lg:px-16 opacity-0 transition-all duration-1000 py-16  text-dark px-6 font-poppins text-center bg-cover bg-center bg-no-repeat"
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
          <span className="font-bold text-purple-700">BONO #1:</span> "Lista de proveedores confiables (de todo el mundo)"
          <br />
          <span>Para que no pierdas tiempo buscando dónde comprar.</span>
        </p>
        <p>
          <span className="font-bold text-purple-700">BONO #2:</span> "Empaques sostenibles y presentaciones que enamoran"
          <br />
          <span>Vendé más con una presentación consciente y profesional.</span>
        </p>
        <p>
          <span className="font-bold text-purple-700">BONO #3:</span> "Tu negocio de Lip Gloss"
          <br />
          <span>Una línea de productos con bajo costo y alta rotación.</span>
        </p>
        <p>
          <span className="font-bold text-purple-700">BONO #4:</span> "Aromaterapia y aceites esenciales"
          <br />
          <span>Aprendé a formular con intención y sentido.</span>
        </p>
        <p>
          <span className="font-bold text-purple-700">BONO #5:</span> "Oleados y macerados naturales"
          <br />
          <span>Extraé principios activos como una experta.</span>
        </p>
        <p>
          <span className="font-bold text-purple-700">BONO #6:</span> "K-Beauty natural: secretos de la cosmética coreana"
          <br />
          <span>Rutinas, ingredientes y fórmulas inspiradas en la tendencia que arrasa.</span>
        </p>
        <p>
          <span className="font-bold text-purple-700">BONO #7:</span> "Más allá de los miedos: Técnicas emocionales para emprender sin rendirte"
          <br />
          <span>Herramientas que te sostienen cuando aparecen los miedos.</span>
        </p>

        <p className="mt-8 font-semibold italic text-primary">
          #Acompañamiento real: Grupo exclusivo de WhatsApp para que no lo hagas sola/o.
          Respondemos tus dudas, te apoyamos y celebramos cada paso con vos.
        </p>

        <p className="italic text-primary">
          #Todo acompañado de videos paso a paso, materiales descargables y acceso de por vida.
        </p>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xl md:text-2xl font-bold mb-2 text-gray-700 line-through">
          De $120 USD
        </p>
        <p className="text-3xl md:text-4xl font-extrabold text-green-600">
          AHORA SÓLO $67.00
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Haz clic para ver el precio en tu moneda local
        </p>
        <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-full shadow-lg text-lg transition-all">
          ORDENAR AHORA
        </button>
        <p className="text-xs text-red-600 mt-2">
          (ATENCIÓN: Precio especial por lanzamiento, pronto aumenta a $120 USD, ¡Asegura tu cupo ahora!)
        </p>
      </div>
    </section>
  );
}
