import { useState } from "react";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "./Modal";

export default function AuthModal({ isOpen, onClose, onAuthSuccess, mode = "login" }) {
  const [authMode, setAuthMode] = useState(mode); // "login" o "register"
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleAuth = () => {
    window.location.href = 'http://localhost:3000/auth/google/callback';
    console.log("Autenticando con Google...");
    
    // Simular autenticación exitosa
    if (onAuthSuccess) {
      onAuthSuccess();
    } else {
      onClose();
    }
  };

  const handleFacebookAuth = () => {
    // Aquí implementarías la lógica para autenticación con Facebook
    console.log("Autenticando con Facebook...");
    // Por ejemplo: window.location.href = "URL_DE_FACEBOOK_AUTH";
    
    // Simular autenticación exitosa
    if (onAuthSuccess) {
      onAuthSuccess();
    } else {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí implementarías la lógica para login/registro tradicional
    console.log("Datos del formulario:", formData);
    
    // Simular autenticación exitosa
    if (onAuthSuccess) {
      onAuthSuccess();
    } else {
      onClose();
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
    setFormData({ email: "", password: "", confirmPassword: "", name: "" });
  };

  const title = authMode === "login" ? "Iniciar Sesión" : "Crear Cuenta";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <div className="py-4 px-3 sm:py-6 sm:px-4">
        {/* Botones de autenticación social */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <button
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-3 sm:gap-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8">
              {/* Logo de Google con colores oficiales */}
              <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <span className="text-base sm:text-lg">Continuar con Google</span>
          </button>

          <button
            onClick={handleFacebookAuth}
            className="w-full flex items-center justify-center gap-3 sm:gap-4 bg-[#1877F2] text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:bg-[#166FE5] hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            <FaFacebook className="text-xl sm:text-2xl" />
            <span className="text-base sm:text-lg">Continuar con Facebook</span>
          </button>
        </div>

        {/* Divisor */}
        <div className="relative my-4 sm:my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">o</span>
          </div>
        </div>

        {/* Formulario tradicional */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {authMode === "register" && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                required={authMode === "register"}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 hover:text-gray-600 text-sm sm:text-base" />
                ) : (
                  <FaEye className="text-gray-400 hover:text-gray-600 text-sm sm:text-base" />
                )}
              </button>
            </div>
          </div>

          {authMode === "register" && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                required={authMode === "register"}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 sm:py-4 px-4 rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm text-sm sm:text-base"
          >
            {authMode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
          </button>
        </form>

        {/* Toggle entre login y registro */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-sm text-gray-600">
            {authMode === "login" ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
            <button
              onClick={toggleAuthMode}
              className="text-primary font-semibold hover:underline"
            >
              {authMode === "login" ? "Crear cuenta" : "Iniciar sesión"}
            </button>
          </p>
        </div>

        {authMode === "login" && (
          <div className="text-center mt-3 sm:mt-4">
            <button className="text-sm text-primary hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        )}

        {/* Información adicional */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
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
