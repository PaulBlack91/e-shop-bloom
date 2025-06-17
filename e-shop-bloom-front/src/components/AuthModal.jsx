import { FaGoogle, FaFacebook } from "react-icons/fa";
import Modal from "./Modal";

export default function AuthModal({ isOpen, onClose }) {
  const handleGoogleAuth = () => {
    // Aquí implementarías la lógica para autenticación con Google
    console.log("Autenticando con Google...");
    // Por ejemplo: window.location.href = "URL_DE_GOOGLE_AUTH";
    onClose(); // Cerrar modal después de la acción
  };

  const handleFacebookAuth = () => {
    // Aquí implementarías la lógica para autenticación con Facebook
    console.log("Autenticando con Facebook...");
    // Por ejemplo: window.location.href = "URL_DE_FACEBOOK_AUTH";
    onClose(); // Cerrar modal después de la acción
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Continuar con tu cuenta" size="lg">
      <div className="py-8 px-4">
        {/* Descripción */}
        <div className="text-center mb-8">
          <p className="text-gray-600 text-lg leading-relaxed">
            Elige tu método preferido para acceder de forma rápida y segura
          </p>
        </div>

        {/* Botones de autenticación social */}
        <div className="space-y-6 max-w-md mx-auto">
          <button
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
          >
            <div className="flex items-center justify-center w-8 h-8">
              {/* Logo de Google con colores oficiales */}
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <span className="text-lg">Continuar con Google</span>
          </button>

          <button
            onClick={handleFacebookAuth}
            className="w-full flex items-center justify-center gap-4 bg-[#1877F2] text-white font-semibold py-4 px-6 rounded-xl hover:bg-[#166FE5] hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] group"
          >
            <FaFacebook className="text-2xl" />
            <span className="text-lg">Continuar con Facebook</span>
          </button>
        </div>

        {/* Información adicional */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 leading-relaxed">
            Al continuar, aceptas nuestros{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="text-primary hover:underline font-medium">
              Política de Privacidad
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
}
