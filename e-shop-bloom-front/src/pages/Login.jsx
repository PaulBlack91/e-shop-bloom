import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error al escribir
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simular login (puedes conectar con tu API aquí)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Datos de usuario simulados
      const userData = {
        id: '1',
        name: 'Paula Martínez',
        email: formData.email,
        hasAllCourses: formData.email === 'admin@test.com', // Admin tiene todos los cursos
        purchasedCourses: formData.email === 'admin@test.com' ? [1, 2, 3] : [1], // Admin tiene todos, usuario normal solo el primero
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Guardar en localStorage
      localStorage.setItem('authToken', 'mock-jwt-token-123');
      localStorage.setItem('userData', JSON.stringify(userData));

      // Navegar al dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Error al iniciar sesión. Inténtalo de nuevo.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para login rápido de prueba
  const quickLogin = (userType) => {
    const email = userType === 'admin' ? 'admin@test.com' : 'user@test.com';
    setFormData({ email, password: '123456' });
    
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bgrosa to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <img 
            src="/public/Helados.png" 
            alt="Logo" 
            className="mx-auto h-20 w-20"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accede a tu academia de repostería
          </p>
        </div>

        {/* Quick Login Buttons for Testing */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800 mb-3 font-medium">🚀 Prueba rápida:</p>
          <div className="flex gap-2">
            <button
              onClick={() => quickLogin('admin')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-md transition-colors"
            >
              Admin (Todos los cursos)
            </button>
            <button
              onClick={() => quickLogin('user')}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-xs py-2 px-3 rounded-md transition-colors"
            >
              Usuario (1 curso)
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </div>

          {/* Links */}
          <div className="flex items-center justify-between text-sm">
            <button 
              type="button"
              className="text-primary hover:text-primary/80 transition-colors"
              onClick={() => navigate('/')}
            >
              ← Volver al inicio
            </button>
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <a href="#" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
