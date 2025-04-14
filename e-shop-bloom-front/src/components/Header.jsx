import { FaShoppingCart } from "react-icons/fa";
import scrollIntoView from "scroll-into-view";




export default function Header() {
  return (
    <header className="bg-bgrosa shadow-md fixed top-0 left-0 w-full z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-primary text-2xl font-bold">The Bloom Business</h1>
        {/* <p>Quienes somos</p> */}
        <button
          onClick={() => {
                
            const el = document.getElementById("inscripcion");
            if (el) {
              scrollIntoView(el, {
                time: 1000, // duración del scroll (en ms)
                align: { top: 0, topOffset: 80 }, // para compensar el header fijo
              });
            }
          }}
          className="bg-accent text-white font-bold px-4 py-2 rounded flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out"
        >
          <FaShoppingCart /> Comprar ahora
        </button>
      </div>
    </header>
  );
}
