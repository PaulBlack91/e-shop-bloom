export default function CourseTips() {
    return (
      <section className="py-16 px-6 bg-secondary text-dark"
      style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className="max-w-4xl mx-auto space-y-8">
          <h3 className="text-3xl md:text-5xl font-georgia italic text-center mb-4">
            ¿Te imaginás creando una marca que no solo venda, sino que también conecte con tus clientes?
          </h3>
  
          <p className="text-5xl text-center font-raleway font-bold mb-3">
            Por ejemplo...
          </p>
  <div className="text-center">
          <div className="mb-6">
            <h4 className="text-xl font-raleway font-bold text-black mb-2">#Una línea de cosmética ancestral, inspirada en enseñanzas de las abuelas:</h4>
            <ul className="list-disc list-inside pl-4 space-y-1 text-lg font-raleway italic">
              <li>Mantecas corporales blancas y untuosas.</li>
              <li>Jabones curativos y velas que sanan.</li>
              <li>Ritual de spa natural y espiritual.</li>
            </ul>
          </div>
  
          <div className="mb-6">
            <h4 className="text-xl font-raleway font-bold text-black mb-2">#O una marca chic y divertida:</h4>
            <ul className="list-disc list-inside pl-4 space-y-1 text-lg font-raleway italic">
              <li>Exfoliantes con aromas irresistibles.</li>
              <li>Lipgloss holográficos.</li>
              <li>Mantecas multicolor que destacan en el mercado.</li>
            </ul>
          </div>
          </div>
          <p className="mb-6 text-xl   font-raleway font-bold text-center mt-6">
            Con la estrategia adecuada, ambos enfoques pueden vender muchísimo, y en mi curso te enseño exactamente cómo lograrlo.
          </p>
        </div>
      </section>
    );
  }