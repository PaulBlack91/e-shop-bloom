export default function Checkout() {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center text-dark px-4">
        <div className="max-w-md w-full bg-white p-6 rounded shadow text-center">
          <h1 className="text-2xl font-bold mb-4">¡Estás a un paso!</h1>
          <p className="mb-6">
            Esta página pronto tendrá la pasarela de pago integrada.
          </p>
          <button
            onClick={() => window.history.back()}
            className="text-primary underline"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }
  