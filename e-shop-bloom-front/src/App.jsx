import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importar páginas
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CoursePage from './pages/CoursePage';
import AuthCallback from './pages/AuthCallback';

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Callback de autenticación */}
          <Route path="/auth/callback" element={<AuthCallback />} />
          
          {/* Dashboard del usuario */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Página de curso individual */}
          <Route path="/course/:courseId" element={<CoursePage />} />
          
          {/* Ruta por defecto */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
