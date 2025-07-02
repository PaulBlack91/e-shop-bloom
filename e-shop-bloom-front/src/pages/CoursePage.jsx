import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <CourseSidebar
        modules={modules}
        currentModuleId={currentModuleId}
        currentLessonId={currentLessonId}
        onModuleSelect={handleModuleSelect}
        onLessonSelect={handleLessonSelect}
        isLoading={false}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToDashboard}
                className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                ← Volver al Dashboard
              </button>
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-800">
                  {currentModule?.title || 'Cargando...'}
                </h1>
                <p className="text-sm text-gray-600">
                  {currentLesson?.title || 'Selecciona una lección'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium text-gray-800">{user?.name}</div>
                <div className="text-xs text-gray-600">{user?.email}</div>
              </div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Course Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col lg:flex-row">
            {/* Video Section */}
            <div className="flex-1 bg-black relative">
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
                  <div className="text-center text-white">
                    <h3 className="text-xl font-semibold mb-2">
                      Selecciona una lección para comenzar
                    </h3>
                    <p className="text-gray-300">
                      Usa el menú lateral para navegar entre las lecciones
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Section */}
            <div className="w-full lg:w-80 xl:w-96 bg-white border-l border-gray-200">
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
