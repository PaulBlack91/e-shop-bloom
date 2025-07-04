import { useState } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import scrollIntoView from "scroll-into-view";
import AuthModal from "./AuthModal";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const scrollToInscripcion = (id) => {
    const el = document.getElementById(id);
    if (el) {
      scrollIntoView(el, {
        time: 1000,
        align: { top: 0, topOffset: 80 },
      });
    }
  };

  const handleLoginClick = () => {
    setMenuOpen(false);
    setIsAuthModalOpen(true);
  };

  return (
    <header className="bg-primary/95 backdrop-blur-md shadow-lg fixed top-0 left-0 w-full z-50 font-poppins border-b border-white/10 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1
          onClick={() => scrollToInscripcion("hero")}
          className="text-bgrosa text-2xl font-bold cursor-pointer hover:text-accent transition-all duration-300 transform hover:scale-105 select-none"
        >
          The Bloom Business
        </h1>

        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={() => scrollToInscripcion("inscripcion")}
            className="unified-btn unified-btn--primary flex items-center gap-2"
          >
            <FaShoppingCart className="btn-icon text-lg" />
            Comprar ahora
          </button>
          <button
            onClick={handleLoginClick}
            className="unified-btn unified-btn--secondary"
          >
            Iniciar sesión
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-xl text-bgrosa hover:text-accent transition-all duration-300 p-2 rounded-lg hover:bg-bgrosa/10 backdrop-blur-sm"
          >
            {menuOpen ? <FaTimes className="rotate-90 transition-transform duration-300" /> : <FaBars className="transition-transform duration-300" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden py-6 bg-bgrosa/95 backdrop-blur-md px-6 pb-6 space-y-4 shadow-xl border-t border-white/10 animate-slide-down">
          <button
            onClick={() => {
              setMenuOpen(false);
              scrollToInscripcion("inscripcion");
            }}
            className="unified-btn unified-btn--primary unified-btn--mobile"
          >
            <FaShoppingCart className="btn-icon" />
            Comprar ahora
          </button>
          <button
            onClick={handleLoginClick}
            className="unified-btn unified-btn--secondary unified-btn--mobile"
          >
            Iniciar sesión
          </button>
        </div>
      )}
      
      {/* Modal de autenticación */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode="login"
      />
    </header>
  );
}
