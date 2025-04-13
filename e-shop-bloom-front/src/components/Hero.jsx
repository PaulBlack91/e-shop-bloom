import scrollIntoView from "scroll-into-view";


export default function Hero() {
  return (
    <section className="pt-28 pb-16 bg-secondary text-dark text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">
          ¡Descubrí el mundo de la cosmética natural con #ÉxitoEnUnPote!
        </h2>
        <p className="mb-6 text-lg">
          Un curso 100% online para que aprendas desde cero a crear productos
          naturales, tanto para cuidarte como para emprender. No importa si sos
          principiante o si ya experimentaste con recetas, acá vas a encontrar
          una guía completa para dominar la cosmética natural con confianza.
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
            className="bg-accent text-dark font-bold px-6 py-3 rounded-full"
          >
            ¡Inscribite ahora!
          </button>
      </div>
    </section>
  );
}
