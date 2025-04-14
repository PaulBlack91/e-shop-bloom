const faqs = [
    {
      question: "¿Qué modalidad tiene el curso?",
      answer: "El curso es 100% online y puedes realizarlo a tu ritmo. A medida que vas avanzando en los módulos se van desbloqueando los siguientes en la plataforma. Es súper dinámico y fácil de seguir.",
    },
    {
      question: "¿Cómo hago para comprar?",
      answer: "Para comprar ''Éxito en un Pote: La Fórmula Secreta de la Cosmética Natural'', haz clic en el botón “ORDENAR AHORA”, rellena tus datos en nuestro formulario de pago seguro y finaliza tu compra para acceder de inmediato al curso.",
    },
    {
      question: "¿Cuáles son los Medios de Pago?",
      answer: "Los medios de pago van a variar según el país. Una vez que toma tu ubicación te arrojará el precio en tu moneda local y podrás ver los medios de pago disponibles.",
    },
    {
      question: "¿Cómo accedo al producto?",
      answer: "Recibirás el acceso en tu correo electrónico y podrás verlo en una computadora, teléfono o tablet.\n\nTambién puedes acceder a través de esta página:\n\n01 - Ve a Hotmart.com y haz clic en 'Entrar'\n02 - Ve al menú lateral y después a 'Mi cuenta'\n03 - Haz clic en 'Mis compras' y allí encontrarás el curso con su nombre ''Éxito en un Pote: La Fórmula Secreta de la Cosmética Natural''.",
    },
    {
      question: "Una vez que lo compro, ¿cuánto tiempo tengo? ",
      answer: "¡El acceso es de por vida! Puedes acceder a él y todas las actualizaciones que voy agregando de por vida. Para que puedas sacarte dudas cuando se presenten y repasar lo que necesites.",
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