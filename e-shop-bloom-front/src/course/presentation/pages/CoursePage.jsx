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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col lg:flex-row"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
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
      <div className="flex-1 overflow-y-auto pt-16 lg:pt-0">
        <div className="max-w-6xl mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 truncate">
                  {course?.title || "Cargando..."}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                  {currentModule?.title
                    ? `${currentModule.title} - ${currentLesson?.title || ""}`
                    : "Selecciona un módulo para comenzar"}
                </p>
              </div>
              <div className="text-left sm:text-right text-xs sm:text-sm text-gray-500 flex-shrink-0">
                <p>
                  Módulo {currentModule?.order || 0} de {modules.length}
                </p>
                {currentModule?.lessons && (
                  <p>
                    {currentModule.lessons.filter((l) => l.isCompleted).length}{" "}
                    de {currentModule.lessons.length} lecciones completadas
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Video Player */}
          <VideoPlayer
            lesson={currentLesson}
            onLessonComplete={handleLessonComplete}
            isLoading={isLoading || !currentLesson}
          />

          {/* Resources Section */}
          <ResourcesSection resources={resources} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
