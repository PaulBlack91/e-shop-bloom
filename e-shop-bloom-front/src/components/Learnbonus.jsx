import React, { useEffect, useRef } from "react";

const highlightColors = [
  "bg-cyan-100", 
  "bg-pink-100", 
];

const reasons = [
  <>
    #Porque querés empezar en la cosmética natural,{" "}
    <strong>pero no sabés por dónde</strong>.
  </>,
  <>
    #Porque probaste seguir <strong>recetas sueltas</strong> y terminaste{" "}
    <strong>más confundida que antes</strong>.
  </>,
  <>
    #Porque querés <strong>emprender de verdad</strong>, con{" "}
    <strong>productos que se vendan</strong> y con estrategia.
  </>,
  <>
    #Porque no querés perder tiempo <em>(ni plata)</em> adivinando.
  </>,
  <>
    #Porque necesitás una <strong>guía que te muestre paso a paso</strong>, sin
    fórmulas complicadas ni ingredientes raros.
  </>,
  <>
    #Porque querés <strong>algo tuyo</strong>, algo que te{" "}
    <strong>ilusione</strong>, que te <strong>motive</strong>, que te dé{" "}
    <strong>propósito</strong>.
  </>,
  <>
    #Porque sabés que <strong>ya es hora de dejar de postergarlo</strong>.
  </>,
];

export default function Learnbonus() {
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
      className="opacity-0 transition-all duration-1000 py-16 bg-bgrosa text-dark text-center px-6 font-poppins"
    >
      <div className="max-w-4xl mx-auto">
        <h4 className="text-4xl md:text-5xl font-bold mb-8">
          ¿Por qué #ÉxitoEnUnPote <span className="font-black">2.0</span> es
          para vos?
        </h4>

        <ul className="space-y-4 text-left">
          {reasons.map((reason, idx) => (
            <li
              key={idx}
              className={`rounded-lg px-4 py-3 leading-relaxed ${
                highlightColors[idx % 2]
              }`}
            >
              {reason}
            </li>
          ))}
        </ul>

        {/* Texto adicional */}
        <h4 className="text-4xl md:text-5xl font-bold mt-16 mb-6">
          ¡Y eso no es todo!
        </h4>
        <p className="text-2xl md:text-3xl mb-10">
          Al inscribirte, recibirás un{" "}
          <span className="text-primary font-semibold">bonus exclusivo</span>{" "}
          que te ayudará a llevar tu negocio al siguiente nivel.
        </p>

        {/* Galería de imágenes */}
  <div className="grid grid-cols-2 gap-10 max-w-5xl mx-auto mt-12">
  {[...Array(7)].map((_, i) => (
    <div
      key={i}
      className={`flex flex-col items-center bg-cyan-100 rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105 border border-gray-200
      ${i === 6 ? "col-span-2 mx-auto" : ""}`}
    >
      <img
        src={`/images/bonus-${i + 1}.png`}
        alt={`Bonus ${i + 1}`}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain"
      />
    </div>
  ))}
</div>
      </div>
    </section>
  );
}
