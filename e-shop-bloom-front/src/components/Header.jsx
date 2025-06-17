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

  return (
    <header className="bg-primary shadow-md fixed top-0 left-0 w-full z-50 font-poppins">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        <h1  onClick={()=>scrollToInscripcion('hero')}
        className="text-bgrosa text-2xl font-bold cursor-pointer" >The Bloom Business</h1>



        <div className="hidden md:flex items-center gap-5">
          <button
            onClick={()=>scrollToInscripcion ("inscripcion")}
            className="bg-accent text-bgrosa font-bold px-5 py-2 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <FaShoppingCart className="text-lg" />
            Comprar ahora
          </button>          <button 
            onClick={() => setIsAuthModalOpen(true)}
            className="text-bgrosa font-bold px-4 py-2 hover:text-black transition duration-200"
          >
            Iniciar sesión
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-xl text-bgrosa ">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden py-4 bg-bgrosa px-20 pb-4 space-y-4 shadow-md ">
          <button
            onClick={() => {
              setMenuOpen(false);
              scrollToInscripcion ("inscripcion")
            }}
            className="w-full bg-accent text-white font-bold px-4 py-2 rounded-full flex items-center justify-center gap-7 shadow"
          >
            <FaShoppingCart />
            Comprar ahora
          </button>          
          <button 
            onClick={() => {
              setMenuOpen(false);
              setIsAuthModalOpen(true);
            }}
            className="w-full text-black font-bold py-2"
          >
            Iniciar sesión          </button>
        </div>
      )}      {/* Modal de autenticación */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}
