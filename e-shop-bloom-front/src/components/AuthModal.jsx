import { useState } from "react";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "./Modal";

export default function AuthModal({ isOpen, onClose, mode = "login" }) {
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
    // Aquí implementarías la lógica para autenticación con Google
    console.log("Autenticando con Google...");
    // Por ejemplo: window.location.href = "URL_DE_GOOGLE_AUTH";
  };

  const handleFacebookAuth = () => {
    // Aquí implementarías la lógica para autenticación con Facebook
    console.log("Autenticando con Facebook...");
    // Por ejemplo: window.location.href = "URL_DE_FACEBOOK_AUTH";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí implementarías la lógica para login/registro tradicional
    console.log("Datos del formulario:", formData);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
    setFormData({ email: "", password: "", confirmPassword: "", name: "" });
  };

  const title = authMode === "login" ? "Iniciar Sesión" : "Crear Cuenta";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <div className="space-y-6">
        {/* Botones de autenticación social */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
          >
            <FaGoogle className="text-red-500 text-xl" />
            Continuar con Google
          </button>

          <button
            onClick={handleFacebookAuth}
            className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#166FE5] transition-all duration-200 shadow-sm"
          >
            <FaFacebook className="text-xl" />
            Continuar con Facebook
          </button>
        </div>

        {/* Divisor */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">o</span>
          </div>
        </div>

        {/* Formulario tradicional */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="text-gray-400 hover:text-gray-600" />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required={authMode === "register"}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-primary/90 transition-all duration-200 shadow-sm"
          >
            {authMode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
          </button>
        </form>

        {/* Toggle entre login y registro */}
        <div className="text-center">
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
          <div className="text-center">
            <button className="text-sm text-primary hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
