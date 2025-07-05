import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBars, FaTimes } from 'react-icons/fa';
import CourseSidebar from '../course/presentation/components/CourseSidebar';
import VideoPlayer from '../course/presentation/components/VideoPlayer';
import ResourcesSection from '../course/presentation/components/ResourcesSection';

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentModuleId, setCurrentModuleId] = useState(null);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Verificar autenticación
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Verificar si el usuario tiene acceso a este curso
      const hasAccess = parsedUser.hasAllCourses || parsedUser.purchasedCourses?.includes(parseInt(courseId));
      
      if (!hasAccess) {
        navigate('/dashboard');
        return;
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
      return;
    }

    // Cargar datos del curso (mock data)
    loadCourseData();
  }, [courseId, navigate]);

  const loadCourseData = async () => {
    setIsLoading(true);
    
    // Mock data - esto vendrá de tu API
    const mockModules = [
      {
        id: 'module-1',
        title: 'Introducción a la Repostería',
        order: 1,
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'Bienvenida al curso',
            duration: '5:30',
            isCompleted: false,
            videoUrl: 'https://example.com/video1.mp4'
          },
          {
            id: 'lesson-1-2',
            title: 'Herramientas básicas',
            duration: '12:45',
            isCompleted: false,
            videoUrl: 'https://example.com/video2.mp4'
          },
          {
            id: 'lesson-1-3',
            title: 'Ingredientes fundamentales',
            duration: '8:20',
            isCompleted: false,
            videoUrl: 'https://example.com/video3.mp4'
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Técnicas Básicas',
        order: 2,
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'Preparación de masas',
            duration: '15:30',
            isCompleted: false,
            videoUrl: 'https://example.com/video4.mp4'
          },
          {
            id: 'lesson-2-2',
            title: 'Horneado perfecto',
            duration: '18:15',
            isCompleted: false,
            videoUrl: 'https://example.com/video5.mp4'
          }
        ]
      },
      {
        id: 'module-3',
        title: 'Decoración y Presentación',
        order: 3,
        lessons: [
          {
            id: 'lesson-3-1',
            title: 'Cremas y betunes',
            duration: '20:45',
            isCompleted: false,
            videoUrl: 'https://example.com/video6.mp4'
          },
          {
            id: 'lesson-3-2',
            title: 'Técnicas de decoración',
            duration: '25:30',
            isCompleted: false,
            videoUrl: 'https://example.com/video7.mp4'
          }
        ]
      }
    ];

    setTimeout(() => {
      setModules(mockModules);
      setCurrentModuleId(mockModules[0]?.id);
      setCurrentLessonId(mockModules[0]?.lessons[0]?.id);
      setIsLoading(false);
    }, 1000);
  };

  const handleModuleSelect = (moduleId) => {
    setCurrentModuleId(moduleId);
  };

  const handleLessonSelect = (lessonId) => {
    setCurrentLessonId(lessonId);
    setSidebarOpen(false); // Cerrar sidebar en móvil al seleccionar lección
    
    // Encontrar la lección seleccionada para obtener su información
    const selectedLesson = modules
      .flatMap(module => module.lessons)
      .find(lesson => lesson.id === lessonId);
      
    if (selectedLesson) {
      // Aquí podrías hacer tracking del progreso, etc.
      console.log('Lección seleccionada:', selectedLesson);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // Obtener información de la lección actual
  const currentLesson = modules
    .flatMap(module => module.lessons)
    .find(lesson => lesson.id === currentLessonId);

  const currentModule = modules.find(module => module.id === currentModuleId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bgrosa flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgrosa flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500/85 via-purple-500/90 to-blue-500/85 backdrop-blur-md shadow-lg border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="/Helados.png" 
              alt="Logo" 
              className="h-10 w-10"
            />
            <button
              onClick={handleBackToDashboard}
              className="unified-btn unified-btn--secondary flex items-center gap-2"
            >
              <FaArrowLeft className="btn-icon" />
              Volver al Dashboard
            </button>
            <div className="hidden md:block w-px h-6 bg-white/20"></div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-white">
                {currentModule?.title || 'Cargando...'}
              </h1>
              <p className="text-sm text-white/80">
                {currentLesson?.title || 'Selecciona una lección'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-white">{user?.name}</div>
              <div className="text-xs text-white/80">{user?.email}</div>
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold border border-white/30">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-xl text-white hover:text-accent transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar - Fixed on mobile, relative on desktop */}
        <div className={`
          fixed md:relative inset-y-0 left-0 z-50 w-80 
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-300 ease-in-out 
          md:transition-none bg-white shadow-lg md:shadow-none
        `}>
          <CourseSidebar
            modules={modules}
            currentModuleId={currentModuleId}
            currentLessonId={currentLessonId}
            onModuleSelect={handleModuleSelect}
            onLessonSelect={handleLessonSelect}
            isLoading={false}
            onClose={() => setSidebarOpen(false)}
          />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Course Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Video Section */}
            <div className="flex-1 bg-black relative min-h-[60vh] lg:min-h-full">
              {currentLesson ? (
                <VideoPlayer
                  lesson={currentLesson}
                  onNext={() => {
                    // Lógica para ir a la siguiente lección
                    console.log('Siguiente lección');
                  }}
                  onPrevious={() => {
                    // Lógica para ir a la lección anterior
                    console.log('Lección anterior');
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="mb-4">
                      <img 
                        src="/Helados.png" 
                        alt="Logo" 
                        className="h-16 w-16 mx-auto opacity-50"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Selecciona una lección para comenzar
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Usa el menú lateral para navegar entre las lecciones
                    </p>
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className="md:hidden bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-pink-600 hover:to-blue-600 transition-all duration-300"
                    >
                      Ver Lecciones
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Section */}
            <div className="w-full lg:w-80 xl:w-96 bg-white/95 backdrop-blur-sm border-l border-white/20 shadow-lg">
              <ResourcesSection
                lesson={currentLesson}
                module={currentModule}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
