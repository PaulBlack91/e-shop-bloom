import { CheckCircle } from "react-feather";
import img from "../assets/Temario.png";
import img2 from "../assets/phone.png";
import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";
import learning from "../data/content";

export default function CourseContent() {
  const sectionRef = useIntersectionAnimation("animate-fade-slide", 0.1);

  return (
    <section
      ref={sectionRef}
      className="py-10 sm:py-16 md:py-20 font-poppins bg-cover bg-center bg-no-repeat text-dark bg-bgrosa"
    >
      <h3 className="py-5 text-4xl md:text-6xl font-georgia italic mb-10 leading-tight text-center ">
        ¿Qué vas a <span className="text-primary">aprender</span>?
      </h3>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-lg md:text-2xl mb-8 bg-amber-100 p-4 rounded-lg text-center md:text-left">
            #ÉxitoEnUnPote 2.0 está dividido en etapas que te llevan de la idea…
            al emprendimiento real.
          </p>

          <ul className="space-y-6 text-xl md:text-2xl  font-medium text-left">
            {learning.map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <CheckCircle className="text-primary w-6 h-6 mt-1 shrink-0" />
                <span>
                  <span className="bg-cyan-100 px-1 rounded">
                    {item.title}:
                  </span>{" "}
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
