import React, { useEffect, useRef } from "react";

const highlightColors = ["bg-cyan-100", "bg-pink-100"];

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
    #Porque no querés perder tiempo <strong>(ni plata)</strong> adivinando.
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

export default function Learn() {
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
      className=" py-10 sm:py-16 md:py-20 opacity-0 transition-all duration-1000 bg-bgrosa text-dark text-center px-6 font-poppins"
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

       
      </div>
    </section>
  );
}
