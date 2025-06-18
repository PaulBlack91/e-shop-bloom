import { useState, useEffect } from "react";
import { FaPlay, FaCheckCircle, FaLock, FaChevronDown, FaChevronRight, FaTimes, FaBars } from "react-icons/fa";

export default function CourseSidebar({ 
  modules, 
  currentModuleId, 
  currentLessonId, 
  onModuleSelect, 
  onLessonSelect,
  isLoading 
}) {
  const [expandedModules, setExpandedModules] = useState(new Set([currentModuleId]));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (currentModuleId) {
      setExpandedModules(prev => new Set([...prev, currentModuleId]));
    }
  }, [currentModuleId]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const isModuleExpanded = (moduleId) => expandedModules.has(moduleId);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLessonClick = (lessonId) => {
    onLessonSelect(lessonId);
    closeMobileMenu(); // Cerrar menú móvil al seleccionar lección
  };

  const handleModuleClick = (moduleId) => {
    toggleModule(moduleId);
    onModuleSelect(moduleId);
    // No cerrar el menú móvil al hacer clic en módulo, solo al seleccionar lección
  };

  if (isLoading) {
    return (
      <>
        {/* Mobile Menu Button */}
        <button className="lg:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 sm:p-3 rounded-lg shadow-lg animate-pulse">
          <FaBars className="text-base sm:text-lg" />
        </button>

        <div className="hidden lg:block w-80 xl:w-96 bg-white border-r border-gray-200 h-screen overflow-y-auto">
          <div className="p-3 sm:p-4 lg:p-6">
            <div className="animate-pulse">
              <div className="h-5 sm:h-6 bg-gray-200 rounded mb-2 sm:mb-4"></div>
              <div className="h-3 sm:h-4 bg-gray-100 rounded mb-4 sm:mb-6 w-3/4"></div>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="mb-3 sm:mb-4 bg-gray-50 rounded-lg p-3">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="ml-2 sm:ml-4 space-y-2">
                    <div className="h-3 bg-gray-100 rounded"></div>
                    <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-100 rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  const sidebarContent = (
    <>
      <div className="p-3 sm:p-4 lg:p-6 border-b bg-gradient-to-r from-bgrosa to-pink-50 border-gray-200">
        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-1 sm:mb-2">
          #ÉxitoEnUnPote 2.0
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          {modules?.length || 0} módulos disponibles
        </p>
      </div>

      <div className="p-2 sm:p-3 lg:p-4 pb-16 sm:pb-20 lg:pb-4 space-y-2 sm:space-y-3 lg:space-y-4 bg-cyan-100">
        {modules?.map((module) => (
          <div key={module.id} className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Module Header */}
            <button
              onClick={() => handleModuleClick(module.id)}
              className={`w-full flex items-center justify-between p-2 sm:p-3 rounded-lg transition-all duration-200 ${
                currentModuleId === module.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="text-xs sm:text-sm font-semibold flex-shrink-0 px-1.5 py-0.5 rounded bg-white/20">
                  {module.order}
                </span>
                <span className="text-xs sm:text-sm font-medium truncate">
                  {module.title}
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <span className="text-xs opacity-75 hidden sm:inline">
                  {module.lessons?.length || 0} lecciones
                </span>
                {isModuleExpanded(module.id) ? (
                  <FaChevronDown className="text-xs" />
                ) : (
                  <FaChevronRight className="text-xs" />
                )}
              </div>
            </button>

            {/* Module Lessons */}
            {isModuleExpanded(module.id) && module.lessons && (
              <div className="mt-2 ml-2 sm:ml-4 mr-2 space-y-1 pb-2">
                {module.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson.id)}
                    className={`w-full flex items-center gap-2 sm:gap-3 p-2 rounded-md text-left transition-all duration-200 ${
                      currentLessonId === lesson.id
                        ? "bg-accent text-white shadow-sm"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {lesson.isCompleted ? (
                        <FaCheckCircle className="text-green-500 text-xs sm:text-sm" />
                      ) : lesson.id === currentLessonId ? (
                        <FaPlay className="text-primary text-xs sm:text-sm" />
                      ) : (
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                          <span className="text-xs font-bold text-gray-400">{index + 1}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">
                        {lesson.title}
                      </p>
                      <p className="text-xs opacity-75">
                        {lesson.duration}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-primary hover:bg-primary/90 text-white p-2 sm:p-3 rounded-lg shadow-lg transition-all duration-200 active:scale-95"
        aria-label="Abrir menú de módulos"
      >
        <FaBars className="text-base sm:text-lg" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 xl:w-96 bg-cyan-100 border-r border-gray-200 h-screen overflow-y-auto scrollbar-thin shadow-lg">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          
          {/* Sidebar */}
          <div className="relative w-80 max-w-[90vw] sm:max-w-[85vw] bg-cyan-100 h-full overflow-y-auto scrollbar-thin shadow-2xl animate-slide-in-left">
            {/* Close Button */}
            <button
              onClick={closeMobileMenu}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-gray-100 hover:bg-gray-200 p-1.5 sm:p-2 rounded-full transition-colors active:scale-95"
              aria-label="Cerrar menú"
            >
              <FaTimes className="text-gray-600 text-sm sm:text-base" />
            </button>
            
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
