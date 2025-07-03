import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGoogle,
  FaFacebook,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa";
import Modal from "./Modal";

export default function AuthModal({ isOpen, onClose, mode = "login" }) {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState(mode); // "login" o "register"
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
    // Limpiar error al escribir
    if (error) setError("");
  };

  const handleSuccessfulAuth = (userData) => {
    // Guardar datos del usuario en localStorage
    localStorage.setItem("authToken", "mock-jwt-token-123");
    localStorage.setItem("userData", JSON.stringify(userData));

    // Cerrar modal y navegar al dashboard
    onClose();
    navigate("/dashboard");
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Redirigir al backend para iniciar OAuth con Google
      window.location.href = "http://localhost:3000/auth/google";
    } catch (err) {
      setError("Error al iniciar autenticación con Google", err);
      setIsLoading(false);
    }
  };

  const handleFacebookAuth = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Simular autenticación con Facebook
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const userData = {
        id: "2",
        name: "Usuario Facebook",
        email: "facebook@test.com",
        hasAllCourses: false,
        purchasedCourses: [1], // Facebook user solo tiene un curso
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      handleSuccessfulAuth(userData);
    } catch (err) {
      setError("Error al autenticar con Facebook", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Validaciones básicas
      if (
        authMode === "register" &&
        formData.password !== formData.confirmPassword
      ) {
        throw new Error("Las contraseñas no coinciden");
      }

      // Simular autenticación tradicional
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const userData = {
        id: "3",
        name: formData.name || "Usuario Registrado",
        email: formData.email,
        hasAllCourses: formData.email === "admin@test.com",
        purchasedCourses: formData.email === "admin@test.com" ? [1, 2, 3] : [1],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      handleSuccessfulAuth(userData);
    } catch (err) {
      setError(err.message || "Error en la autenticación");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
    setFormData({ email: "", password: "", confirmPassword: "", name: "" });
  };

  const title = authMode === "login" ? "Iniciar Sesión" : "Crear Cuenta";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <div className="py-4 px-3 sm:py-6 sm:px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-lg relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-5 left-5 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-5 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10">
          {/* Logo de Helados en la parte superior */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 relative">
              <img 
                src="/Helados.png" 
                alt="Helados" 
                className="w-full h-full object-contain animate-pulse"
              />
            </div>
          </div>
        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Botones de autenticación social */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 sm:gap-4 bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 text-gray-700 font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:from-gray-50 hover:to-white hover:border-blue-300 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
          >
            {/* Efecto de brillo al hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 transform -skew-x-12 group-hover:animate-pulse"></div>
            
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 relative z-10">
                {/* Logo de Google con colores oficiales */}
                <svg viewBox="0 0 24 24" className="w-5 sm:w-6 h-5 sm:h-6 group-hover:animate-pulse">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
            )}
            <span className="text-base sm:text-lg relative z-10 group-hover:text-blue-600 transition-colors duration-300">
              {isLoading ? "Conectando con Google..." : "Continuar con Google"}
            </span>
          </button>

          <button
            onClick={handleFacebookAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 sm:gap-4 bg-gradient-to-r from-[#1877F2] to-[#166FE5] text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:from-[#166FE5] hover:to-[#1461D0] hover:shadow-xl hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
          >
            {/* Efecto de brillo al hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform -skew-x-12"></div>
            {isLoading ? (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-200 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            ) : (
              <FaFacebook className="text-xl sm:text-2xl relative z-10 group-hover:animate-pulse" />
            )}
            <span className="text-base sm:text-lg relative z-10">
              {isLoading ? "Conectando con Facebook..." : "Continuar con Facebook"}
            </span>
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
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gradient-to-r from-white to-gray-50 hover:border-gray-300 transition-all duration-300 text-sm sm:text-base"
                placeholder="Tu nombre completo"
                required={authMode === "register"}
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>{" "}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gradient-to-r from-white to-gray-50 hover:border-gray-300 transition-all duration-300 text-sm sm:text-base disabled:opacity-50"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gradient-to-r from-white to-gray-50 hover:border-gray-300 transition-all duration-300 text-sm sm:text-base"
                placeholder="Tu contraseña"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-pink-500 transition-colors duration-300"
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
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirmar contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gradient-to-r from-white to-gray-50 hover:border-gray-300 transition-all duration-300 text-sm sm:text-base"
                placeholder="Confirma tu contraseña"
                required={authMode === "register"}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold py-3 sm:py-4 px-4 rounded-lg hover:from-pink-600 hover:to-blue-600 hover:shadow-xl hover:shadow-pink-200/50 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            {/* Efecto de brillo al hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform -skew-x-12"></div>
            
            {isLoading ? (
              <>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-200 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="relative z-10">
                  {authMode === "login"
                    ? "Iniciando sesión..."
                    : "Creando cuenta..."}
                </span>
              </>
            ) : (
              <span className="relative z-10">
                {authMode === "login" ? "Iniciar Sesión ✨" : "Crear Cuenta 🎉"}
              </span>
            )}
          </button>
        </form>

        {/* Toggle entre login y registro */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-sm text-gray-600">
            {authMode === "login"
              ? "¿No tienes una cuenta?"
              : "¿Ya tienes una cuenta?"}{" "}
            <button
              onClick={toggleAuthMode}
              className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent font-semibold hover:from-pink-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              {authMode === "login" ? "Crear cuenta" : "Iniciar sesión"}
            </button>
          </p>
        </div>

        {authMode === "login" && (
          <div className="text-center mt-3 sm:mt-4">
            <button className="text-sm bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent hover:from-pink-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105">
              ¿Olvidaste tu contraseña? ✨
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
      </div>
    </Modal>
  );
}
