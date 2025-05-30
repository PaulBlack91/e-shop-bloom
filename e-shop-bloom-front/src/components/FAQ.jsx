import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";
import { faqs } from "../data/Faqs.jsx"; 



export default function FAQ() {
  const [openIndexes, setOpenIndexes] = useState([]);
 
  const toggle = (index) => {
    setOpenIndexes(
      (prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index) 
          : [...prev, index] 
    );
  };
    const sectionRef = useIntersectionAnimation("animate-fade-slide", 0.1);


  return (
    <section ref={sectionRef} className="py-10 sm:py-16 md:py-20 font-poppins bg-bgrosa text-dark">
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
