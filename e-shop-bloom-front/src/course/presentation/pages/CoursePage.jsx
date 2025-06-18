import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseSidebar from "../components/CourseSidebar.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";
import ResourcesSection from "../components/ResourcesSection.jsx";
import courseContainer from "../../CourseContainer.js";

export default function CoursePage() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos iniciales
  const loadCourseData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [courseData, modulesData] = await Promise.all([
        courseContainer.getCourseUseCase.execute("exito-en-un-pote"),
        courseContainer.getModulesUseCase.execute("exito-en-un-pote"),
      ]);

      setCourse(courseData);
      setModules(modulesData);

      // Si no hay módulo seleccionado, seleccionar el primero
      if (!moduleId && modulesData.length > 0) {
        navigate(`/course/${modulesData[0].id}`, { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [moduleId, navigate]);

  useEffect(() => {
    loadCourseData();
  }, [loadCourseData]);

  // Cargar módulo específico cuando cambia el ID
  useEffect(() => {
    if (moduleId && modules.length > 0) {
      loadModuleData(moduleId);
    }
  }, [moduleId, modules]);

  // Seleccionar primera lección cuando cambia el módulo
  useEffect(() => {
    if (currentModule?.lessons?.length > 0 && !lessonId) {
      const firstLesson = currentModule.lessons[0];
      navigate(`/course/${moduleId}/${firstLesson.id}`, { replace: true });
    }
  }, [currentModule, lessonId, moduleId, navigate]);

  // Cargar lección específica
  useEffect(() => {
    if (lessonId && currentModule?.lessons) {
      const lesson = currentModule.lessons.find((l) => l.id === lessonId);
      setCurrentLesson(lesson);
    }
  }, [lessonId, currentModule]);

  const loadModuleData = async (selectedModuleId) => {
    try {
      const moduleData = await courseContainer.getModuleUseCase.execute(
        selectedModuleId
      );
      setCurrentModule(moduleData);
      setResources(moduleData.resources || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleModuleSelect = (selectedModuleId) => {
    if (selectedModuleId !== moduleId) {
      navigate(`/course/${selectedModuleId}`);
    }
  };

  const handleLessonSelect = (selectedLessonId) => {
    if (selectedLessonId !== lessonId) {
      navigate(`/course/${moduleId}/${selectedLessonId}`);
    }
  };

  const handleLessonComplete = async (lessonId) => {
    try {
      await courseContainer.markLessonCompletedUseCase.execute(lessonId);

      // Actualizar el estado local
      setCurrentModule((prev) => ({
        ...prev,
        lessons: prev.lessons.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, isCompleted: true } : lesson
        ),
      }));

      // Actualizar módulos
      setModules((prev) =>
        prev.map((module) =>
          module.id === moduleId
            ? {
                ...module,
                lessons: module.lessons?.map((lesson) =>
                  lesson.id === lessonId
                    ? { ...lesson, isCompleted: true }
                    : lesson
                ),
              }
            : module
        )
      );
    } catch (err) {
      console.error("Error al marcar lección como completada:", err);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-2xl max-w-md w-full text-center border border-red-100">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-3 sm:mb-4">Oops! Algo salió mal</h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium text-sm sm:text-base"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex flex-col lg:flex-row"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Overlay para mejor legibilidad en móvil */}
      <div className="fixed inset-0 bg-black/10 lg:hidden" />
      
      {/* Sidebar */}
      <CourseSidebar
        modules={modules.map((module) => ({
          ...module,
          lessons: module.id === moduleId ? currentModule?.lessons : [],
        }))}
        currentModuleId={moduleId}
        currentLessonId={lessonId}
        onModuleSelect={handleModuleSelect}
        onLessonSelect={handleLessonSelect}
        isLoading={isLoading}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin pt-16 lg:pt-0 relative z-10">
        <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 xl:p-8 space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Header */}
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 border border-white/20">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-800 leading-tight">
                  {course?.title || "Cargando..."}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-2 sm:mt-3">
                  {currentModule?.title
                    ? `${currentModule.title}${currentLesson?.title ? ` - ${currentLesson.title}` : ""}`
                    : "Selecciona un módulo para comenzar"}
                </p>
              </div>
              <div className="text-left sm:text-right text-xs sm:text-sm lg:text-base text-gray-500 flex-shrink-0 bg-gray-50 p-3 rounded-lg">
                <p className="font-medium">
                  Módulo {currentModule?.order || 0} de {modules.length}
                </p>
                {currentModule?.lessons && (
                  <p className="mt-1">
                    <span className="text-green-600 font-semibold">
                      {currentModule.lessons.filter((l) => l.isCompleted).length}
                    </span>{" "}
                    de {currentModule.lessons.length} lecciones completadas
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Video Player - Takes 2 columns on XL screens */}
            <div className="xl:col-span-2">
              <VideoPlayer
                lesson={currentLesson}
                onLessonComplete={handleLessonComplete}
                isLoading={isLoading || !currentLesson}
              />
            </div>

            {/* Resources Section - Takes 1 column on XL screens */}
            <div className="xl:col-span-1">
              <ResourcesSection resources={resources} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
