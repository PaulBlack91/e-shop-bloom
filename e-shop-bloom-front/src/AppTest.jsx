import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componente de prueba simple
function TestComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🎉 ¡Funciona!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Tu aplicación React está corriendo correctamente
        </p>
        <div className="space-y-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            ✅ React Router configurado
          </div>
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
            ✅ Tailwind CSS funcionando
          </div>
          <div className="bg-purple-100 border border-purple-400 text-purple-700 px-4 py-3 rounded">
            ✅ Vite dev server activo
          </div>
        </div>
        <div className="mt-6">
          <a 
            href="/login" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Ir a Login
          </a>
          <a 
            href="/dashboard" 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Ir a Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
          {/* Test Route */}
          <Route path="/" element={<TestComponent />} />
          <Route path="/test" element={<TestComponent />} />
          
          {/* Otras rutas comentadas temporalmente */}
          {/* 
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          */}
          
          <Route path="*" element={<TestComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
