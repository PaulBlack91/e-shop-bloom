import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";

export default function Learnbonus() {
  const sectionRef = useIntersectionAnimation("animate-fade-slide", 0.1);

  return (
    <section
      ref={sectionRef}
      className=" py-10 mx-1 sm:py-16 md:py-20 opacity-0 transition-all duration-1000 bg-bgrosa text-dark text-center px-6 font-poppins"
    >
      <h4 className="text-4xl md:text-5xl font-bold mb-6">
        ¡Y eso no es todo!
      </h4>
      <p className="text-2xl md:text-3xl mb-10">
        Al inscribirte, recibirás{" "}
        <span className="text-primary font-semibold">bonos exclusivos</span> que
        te ayudarán a llevar tu negocio al siguiente nivel.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-6xl mx-auto mt-12 ">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className={` flex justify-center transition-transform duration-500 hover:scale-105 ${
              i === 6 ? "sm:col-span-2" : ""
            }`}
          >
            <img
              src={`/images/bonus-${i + 1}.png`}
              alt={`Bonus ${i + 1}`}
              className=" bg-cyan-50 w-full max-w-full sm:max-w-sm md:max-w-md object-contain rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
