const faqs = [
    {
      question: "¿Necesito experiencia previa?",
      answer: "No, el curso está diseñado desde cero y te guiará paso a paso.",
    },
    {
      question: "¿Cuánto dura el curso?",
      answer: "Tiene una duración de 4 semanas con acceso de por vida al contenido.",
    },
  ];

  export default function FAQ() {
    return (
      <section className="py-16 bg-white text-dark">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h3>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h4 className="text-xl font-semibold">{faq.question}</h4>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }