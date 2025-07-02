import { useNavigate } from 'react-router-dom';

export default function SimpleLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      {/* Header simple */}
      <header className="bg-white shadow-lg p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">
            The Bloom Business
          </h1>
          <button
            onClick={() => navigate('/login')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Iniciar Sesión
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            🧁 Academia de Repostería
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Aprende las técnicas más avanzadas de repostería artesanal con nuestros cursos especializados. 
            Desde principiante hasta experto.
          </p>
          
          <div className="flex gap-4 justify-center mb-12">
            <button
              onClick={() => navigate('/login')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Ver Cursos
            </button>
            <button
              onClick={() => navigate('/test')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Página de Prueba
            </button>
          </div>

          {/* Cards de cursos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-4xl mb-4">🍰</div>
              <h3 className="text-xl font-bold mb-2">Repostería Básica</h3>
              <p className="text-gray-600 mb-4">
                Fundamentos esenciales para comenzar en el mundo de la repostería
              </p>
              <div className="text-2xl font-bold text-purple-600">$49.99</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-400">
              <div className="text-4xl mb-4">🎂</div>
              <h3 className="text-xl font-bold mb-2">#ÉxitoEnUnPote 2.0</h3>
              <p className="text-gray-600 mb-4">
                Curso completo de repostería artesanal con técnicas avanzadas
              </p>
              <div className="text-2xl font-bold text-purple-600">$99.99</div>
              <div className="text-sm text-purple-600 font-semibold mt-2">⭐ Más Popular</div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-4xl mb-4">🍭</div>
              <h3 className="text-xl font-bold mb-2">Decoración Avanzada</h3>
              <p className="text-gray-600 mb-4">
                Técnicas profesionales de decoración y presentación
              </p>
              <div className="text-2xl font-bold text-purple-600">$79.99</div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">🎯 Rutas de Navegación</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-left">
                <h4 className="font-semibold mb-2">Páginas Disponibles:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• <strong>/</strong> - Landing Page (actual)</li>
                  <li>• <strong>/login</strong> - Iniciar Sesión</li>
                  <li>• <strong>/dashboard</strong> - Panel de Cursos</li>
                  <li>• <strong>/course/1</strong> - Curso Individual</li>
                  <li>• <strong>/test</strong> - Página de Prueba</li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-semibold mb-2">Estado del Desarrollo:</h4>
                <ul className="space-y-1 text-sm">
                  <li>✅ React Router configurado</li>
                  <li>✅ Tailwind CSS funcionando</li>
                  <li>✅ Sistema de autenticación</li>
                  <li>✅ Panel de cursos</li>
                  <li>✅ Compras y estados</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
