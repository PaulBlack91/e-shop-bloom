import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

const faqs = [
  {
    question: "¿Qué modalidad tiene el curso?",
    answer:
      "El curso es 100% online y puedes realizarlo a tu ritmo. A medida que vas avanzando en los módulos se van desbloqueando los siguientes en la plataforma. Es súper dinámico y fácil de seguir.",
  },
  {
    question: "¿Cómo hago para comprar?",
    answer:
      "Para comprar ''Éxito en un Pote: La Fórmula Secreta de la Cosmética Natural'', haz clic en el botón “ORDENAR AHORA”, rellena tus datos en nuestro formulario de pago seguro y finaliza tu compra para acceder de inmediato al curso.",
  },
  {
    question: "¿Cuáles son los Medios de Pago?",
    answer:
      "Los medios de pago van a variar según el país. Una vez que toma tu ubicación te arrojará el precio en tu moneda local y podrás ver los medios de pago disponibles.",
  },

  {
    question: "Una vez que lo compro, ¿cuánto tiempo tengo? ",
    answer:
      "¡El acceso es de por vida! Puedes acceder a él y todas las actualizaciones que voy agregando de por vida. Para que puedas sacarte dudas cuando se presenten y repasar lo que necesites.",
  },
];

export default function FAQ() {
  const [openIndexes, setOpenIndexes] = useState([]);
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

  const toggle = (index) => {
    setOpenIndexes(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) // Cierra si ya estaba abierto
          : [...prev, index] // Abre si no estaba abierto
    );
  };

  return (
    <section ref={sectionRef} className="py-24 bg-secondary text-dark">
      <div className="max-w-4xl mx-auto px-4">
        <h4 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Preguntas Frecuentes
        </h4>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-primary/20 rounded-2xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center p-6 text-left font-semibold text-lg hover:bg-primary/10 transition"
              >
                <span>{faq.question}</span>
                <FiChevronDown
                  className={`text-2xl text-primary transition-transform duration-300 ${
                    openIndexes.includes(i) ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openIndexes.includes(i) && (
                  <motion.div
                    key="answer"
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="px-6 pb-6 origin-top text-base text-dark/80"
                    style={{ transformOrigin: "top" }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
