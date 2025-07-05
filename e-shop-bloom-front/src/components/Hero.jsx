import scrollIntoView from "scroll-into-view";
import img from "../assets/Helados.png";
import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";
import styles from "./Hero.module.css";

export default function Hero() {
  const sectionRef = useIntersectionAnimation("animate-fade-slide", 0.1);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className=" py-10 sm:py-16 md:py-20 pt-28 pb-10 sm:pb-14 md:pb-16 bg-cover bg-center bg-no-repeat text-dark "
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="w-full md:w-1/2 text-center md:text-left order-1 md:order-1">
          <h2 className="text-4xl md:text-6xl text-center font-georgia italic  mb-5 leading-tight">
            ¡Descubrí el mundo de la cosmética natural con{" "}
            <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent font-semibold">#ÉxitoEnUnPote!</span>
          </h2>

          <p className="mb-5 text-lg text-center md:text-3xl font-sans italic font-bold">
            Un curso 100% online para que aprendas desde cero a crear productos
            naturales, tanto para cuidarte como para emprender. No importa si
            sos principiante o si ya experimentaste con recetas, acá vas a
            encontrar una guía completa para dominar la cosmética natural con
            confianza.
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
              className="hero-btn hero-btn-pulse bg-accent text-white font-bold text-2xl md:text-4xl px-11 py-6 rounded-full transition-all duration-300 ease-in-out"
            >
              ¡Inscribite ahora!
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center order-2 md:order-2">
          <div className={styles.heroImageWrapper}>
            <div className={styles.imageContainer}>
              <img
                src={img}
                alt="Hero"
                className={`${styles.heroImage} w-full max-w-[500px] sm:max-w-[550px] lg:max-w-[650px] xl:max-w-[700px] mx-auto`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
