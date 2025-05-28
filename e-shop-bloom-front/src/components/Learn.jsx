import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";
import { reasons } from "../data/reason.jsx";

const highlightColors = ["bg-cyan-100", "bg-pink-100"];

export default function Learn() {
  const sectionRef = useIntersectionAnimation("animate-fade-slide", 0.1);

  return (
    <section
      ref={sectionRef}
      className=" pt-10 pb-0 sm:py-16 md:py-20 opacity-0 transition-all duration-1000 bg-bgrosa text-dark text-center px-6 font-poppins"
    >
      <div className="max-w-4xl mx-auto">
        <h4 className="text-4xl md:text-5xl font-bold mb-8">
          ¿Por qué #ÉxitoEnUnPote <span className="font-black">2.0</span> es
          para vos?
        </h4>

        <ul className=" text-xl space-y-4 text-left">
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
