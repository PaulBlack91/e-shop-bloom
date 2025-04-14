import scrollIntoView from "scroll-into-view";
import img from "../assets/Helados.png";

export default function Hero() {
  return (
    <section
      className="pt-5 pb-5 bg-cover bg-center bg-no-repeat text-dark"
      style={{ backgroundImage: "url('public/bg.jpg')" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Texto */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            ¡Descubrí el mundo de la cosmética natural con{" "}
            <span className="text-primary">#ÉxitoEnUnPote!</span>
          </h2>
          <p className="mb-6 text-lg md:text-xl">
            Un curso 100% online para que aprendas desde cero a crear productos
            // naturales, tanto para cuidarte como para emprender. No importa si
            sos // principiante o si ya experimentaste con recetas, acá vas a
            encontrar // una guía completa para dominar la cosmética natural con
            confianza.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("inscripcion");
              if (el) {
                scrollIntoView(el, {
                  time: 1000, // duración del scroll (en ms)
                  align: { top: 0, topOffset: 80 }, // para compensar el header fijo
                });
              }
            }}
            className="bg-accent text-dark font-bold px-6 py-3"
          >
            ¡Inscribite ahora!
          </button>
        </div>

        {/* Imagen */}
        <div className="flex items-center justify-center min-h-screen">
          <img
            src={img}
            alt="Hero"
            className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[450px]"
          />
        </div>
      </div>
    </section>
  );
}
