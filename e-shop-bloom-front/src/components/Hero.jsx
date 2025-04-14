import scrollIntoView from "scroll-into-view";
import img from "../assets/Helados.png";
import { useEffect, useRef } from "react";

export default function Hero() {
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
      className="pt-28 pb-16 bg-cover bg-center bg-no-repeat text-dark "
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Texto */}
        <div className="w-full md:w-1/2 text-center md:text-left order-1 md:order-1">
          <h2 className="text-4xl md:text-6xl text-center font-georgia italic  mb-10 leading-tight">
            ¡Descubrí el mundo de la cosmética natural con{" "}
            <span className="text-primary">#ÉxitoEnUnPote!</span>
          </h2>

          <p className="mb-8 text-lg text-center md:text-3xl font-sans italic font-bold">
            Un curso 100% online para que aprendas desde cero a crear productos
            naturales, tanto para cuidarte como para emprender. No importa si
            sos principiante o si ya experimentaste con recetas, acá vas a
            encontrar una guía completa para dominar la cosmética natural con
            confianza.
          </p>

          {/* Botón (solo se mueve en mobile) */}
          <div className="mt-20 flex justify-center order-3 md:order-3">
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
              className="bg-accent text-white font-bold text-lg md:text-4xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
            >
              ¡Inscribite ahora!
            </button>
          </div>
        </div>

        {/* Imagen (solo cambia posición en mobile) */}
        <div className="w-full md:w-1/2 flex justify-center items-center order-2 md:order-2">
          <img
            src={img}
            alt="Hero"
            className="w-full max-w-[500px] sm:max-w-[550px] lg:max-w-[650px] xl:max-w-[700px] mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
