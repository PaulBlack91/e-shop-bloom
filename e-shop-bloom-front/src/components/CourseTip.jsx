import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";

export default function CourseTips() {
  const sectionRef = useIntersectionAnimation("animate-fade-slide", 0.1);

  return (
    <section
      ref={sectionRef}
      className=" opacity-0 transition-all duration-1000 py-10 px-6 sm:py-16 md:py-20 text-dark font-poppins bg-no-repeat bg-cover bg-center  "
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
          ¿Te imaginás creando una marca que no solo venda, sino que también
          conecte con tus clientes?
        </h3>

        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 ">
          Por ejemplo...
        </p>

        <div className=" gap-8 justify-center text-center">
          <div>
            <h4 className="text-2xl font-semibold text-primary mb-6 mt-6">
              #Una línea de cosmética ancestral, inspirada en enseñanzas de las
              abuelas:
            </h4>
            <ul className="list-disc list-inside pl-4 space-y-1 text-2xl italic text-left sm:text-center">
              <li>Mantecas corporales blancas y untuosas.</li>
              <li>Jabones curativos y velas que sanan.</li>
              <li>Ritual de spa natural y espiritual.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-2xl font-semibold text-primary mb-6 mt-6">
              #O una marca chic y divertida:
            </h4>
            <ul className="list-disc list-inside pl-4 space-y-1 text-2xl italic  text-left sm:text-center">
              <li>Exfoliantes con aromas irresistibles.</li>
              <li>Lipgloss holográficos.</li>
              <li>Mantecas multicolor que destacan en el mercado.</li>
            </ul>
          </div>
        </div>
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
          Con la estrategia adecuada, ambos enfoques pueden vender muchísimo, y
          en mi curso te enseño exactamente cómo lograrlo.
        </p>
      </div>
    </section>
  );
}
