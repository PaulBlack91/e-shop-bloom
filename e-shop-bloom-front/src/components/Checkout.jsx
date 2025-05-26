import React from 'react';

export default function CheckoutOptions() {
  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-20 px-6"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="max-w-5xl mx-auto text-center text-black drop-shadow-lg">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Elegí tu método de pago</h2>
        <p className="text-lg md:text-xl mb-12">
          Seleccioná la opción de pago según tu ubicación
        </p>

        <div className="flex flex-col md:flex-row gap-10 justify-center items-stretch">
          {/* MercadoPago - Argentina */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 md:w-1/2 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Argentina</h3>
            <p className="text-gray-600 mb-6">
              Pagá con tarjeta, transferencia o efectivo a través de MercadoPago.
            </p>
            <a
              href="https://tulink.mercadopago.com" // reemplazá con tu link real
              className="inline-block bg-[#009ee3] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#007bbb] transition"
            >
              Pagar con MercadoPago
            </a>
          </div>

          {/* Stripe - Internacional */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 md:w-1/2 hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">🌎 Resto del mundo</h3>
            <p className="text-gray-600 mb-6">
              Pagá con tarjeta internacional vía Stripe desde cualquier país.
            </p>
            <a
              href="https://tu-checkout-stripe.com" // reemplazá con tu link real
              className="inline-block bg-[#6772e5] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#5469d4] transition"
            >
              Pagar con Stripe
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
