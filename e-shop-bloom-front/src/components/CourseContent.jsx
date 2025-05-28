import { CheckCircle } from "react-feather";
import img from "../assets/Temario.png";
import img2 from "../assets/phone.png";
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

  


  const learning = [
    {
      title: "1. Fundamentos de la cosmética natural",
      description:
        "Aprendé desde cero. Entendé cómo funciona la piel, qué ingredientes usar y cómo formular con sentido, no solo copiar recetas.",
    },
    {
      title: "2. Producción cosmética rentable",
      description:
        "Recetas probadas, simples y listas para vender. Productos de alta rotación que podés empezar a hacer ya.",
    },
    {
      title: "3. Ritual y bienestar",
      description:
        "Creá velas, aromas, jabones sensoriales y productos que no solo se venden: se sienten. Vas a diseñar experiencias que conectan.",
    },
    {
      title: "4. Cosmética para sanar",
      description:
        "Recetas terapéuticas y funcionales: cremas calmantes, desodorantes naturales, bálsamos para el dolor, sebo de res y más. Porque la cosmética también puede cuidar.",
    },
    {
      title: "5. Marketing para emprendedoras reales",
      description:
        "Te enseño cómo vender sin venderte. Cómo posicionarte en redes, qué contenido compartir, cómo poner precios y dejar de postergar tu lanzamiento.",
    },
  ];

  return (
   <section
  ref={sectionRef}
  className="py-10 sm:py-16 md:py-20 font-poppins bg-cover bg-center bg-no-repeat text-dark bg-bgrosa"
>
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    
    <div>
      <h3 className="text-4xl md:text-6xl font-georgia italic mb-10 leading-tight text-center ">
        ¿Qué vas a <span className="text-primary">aprender</span>?
      </h3>

      <p className="text-lg md:text-2xl mb-8 bg-amber-100 p-4 rounded-lg text-center md:text-left">
        #ÉxitoEnUnPote 2.0 está dividido en etapas que te llevan de la idea…
        al emprendimiento real.
      </p>

      <ul className="space-y-6 text-lg md:text-2xl  font-medium text-left">
        {learning.map((item, idx) => (
          <li key={idx} className="flex items-start gap-4">
            <CheckCircle className="text-primary w-6 h-6 mt-1 shrink-0" />
            <span>
              <span className="bg-cyan-100 px-1 rounded">{item.title}:</span>{" "}
              {item.description}
            </span>
          </li>
        ))}
      </ul>
    </div>

    
    <div className="flex flex-col items-center justify-center gap-8">
      <img
        src={img}
        alt="Contenido del curso"
        className="w-full max-w-[500px] rounded-xl shadow-lg"
      />
      <img
        src={img2}
        alt="Contenido del curso"
        className="w-full max-w-[500px] "
      />
    </div>
  </div>
</section>

  );
}
