import React, { useState } from "react";
import { useIntersectionAnimation } from "../hooks/useIntersectionAnimation";
import AuthModal from "./AuthModal";

export default function CheckoutOptions() {
  const sectionRef = useIntersectionAnimation("animate-fade-slide", 0.1);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentClick = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    
    // Redirigir según el método de pago seleccionado
    if (selectedPaymentMethod === 'argentina') {
      window.location.href = "https://tulink.mercadopago.com"; // Link real de MercadoPago
    } else if (selectedPaymentMethod === 'internacional') {
      window.location.href = "https://tu-checkout-stripe.com"; // Link real de Stripe
    }
  };

  return (
    <section
      id="inscripcion"
      ref={sectionRef}
      className="bg-cover bg-center bg-no-repeat py-10 px-5 sm:py-16 md:py-20 font-poppins"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="max-w-5xl mx-auto text-center text-black drop-shadow-lg">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Elegí tu método de pago
        </h2>
        <p className="text-lg md:text-xl mb-12">
          Seleccioná la opción de pago según tu ubicación
        </p>

        <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch">
          {/* MercadoPago - Argentina */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 md:w-1/2 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Argentina</h3>
            <p className="text-gray-600 mb-6">
              Pagá con tarjeta, transferencia o efectivo a través de
              MercadoPago.
            </p>            <button
              onClick={() => handlePaymentClick('argentina')}
              className="inline-block bg-[#009ee3] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#007bbb] transition"
            >
              Pagar en Argentina
            </button>
          </div>

          {/* Stripe - Internacional */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 md:w-1/2 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              🌎 Resto del Mundo
            </h3>
            <p className="text-gray-600 mb-6">
              Pagá con tarjeta internacional desde cualquier país.
            </p>            <button
              onClick={() => handlePaymentClick('internacional')}
              className="inline-block bg-[#6772e5] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#5469d4] transition"
            >
              Pagar Resto del Mundo
            </button>
          </div>        </div>
      </div>

      {/* Modal de autenticación */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </section>
  );
}
