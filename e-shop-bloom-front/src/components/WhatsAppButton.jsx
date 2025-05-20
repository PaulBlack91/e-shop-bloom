import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5493515144707?text=%C2%A1Hola!%20Estoy%20interesado%20en%20el%20curso.%20%C2%BFMe%20pod%C3%A9s%20contar%20m%C3%A1s?"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-10 z-60 bg-green-500 hover:bg-green-600 text-white p-6 rounded-full shadow-lg  duration-300 ease-in-out transition transform hover:scale-110 animate-bounce " 
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="text-7xl" />
      
    </a>
  );
}

