import { CheckCircle } from "react-feather";
import img from "../assets/Temario.png";
import { useEffect, useRef } from "react";

export default function CourseContent() {
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
      className="pt-28 pb-20 bg-cover bg-center bg-no-repeat text-dark bg-bgrosa"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="w-full text-center md:text-left">
          <h3 className="text-4xl md:text-6xl font-georgia italic mb-10 leading-tight">
            ¿Qué vas a <span className="text-primary">aprender</span>?
          </h3>

          <ul className="space-y-6 text-lg md:text-2xl font-sans font-medium text-left sm:text-center">
            {[
              "Cómo identificar tu pasión y convertirla en un negocio digital rentable.",
              "Estrategias de marketing para atraer a tu cliente ideal.",
              "Herramientas para crear tu producto digital sin complicaciones técnicas.",
              "Automatización de ventas y atención al cliente.",
              "Escalar tu negocio para generar ingresos pasivos.",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <CheckCircle className="text-primary mt-1" size={28} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img
            src={img}
            alt="Contenido del curso"
            className="w-full max-w-[500px] rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
