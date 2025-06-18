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
        <button className="  lg:hidden fixed top-4 left-4 z-50 bg-primary text-white p-3 rounded-lg shadow-lg">
          <FaBars className="text-lg" />
        </button>

        <div className="hidden lg:block w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
          <div className="p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="mb-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="ml-4 space-y-2">
                    <div className="h-3 bg-gray-100 rounded"></div>
                    <div className="h-3 bg-gray-100 rounded"></div>
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
      <div className="p-4 sm:p-6 border-b bg-bgrosa border-gray-200">
        <h2 className="text-lg sm:text-xl  font-bold text-gray-800 mb-2">
          #ÉxitoEnUnPote 2.0
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          {modules?.length || 0} módulos disponibles
        </p>
      </div>

      <div className=" p-3 sm:p-4 pb-20 lg:pb-4">
        {modules?.map((module) => (
          <div key={module.id} className="mb-3 sm:mb-4">
            {/* Module Header */}
            <button
              onClick={() => handleModuleClick(module.id)}
              className={`w-full flex items-center justify-between p-2 sm:p-3 rounded-lg transition-all duration-200 ${
                currentModuleId === module.id
                  ? "bg-primary text-white"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="text-xs sm:text-sm font-semibold flex-shrink-0">
                  Mod {module.order}
                </span>
                <span className="text-xs sm:text-sm font-medium truncate">
                  {module.title}
                </span>
              </div>
              {isModuleExpanded(module.id) ? (
                <FaChevronDown className="text-xs flex-shrink-0" />
              ) : (
                <FaChevronRight className="text-xs flex-shrink-0" />
              )}
            </button>

            {/* Module Lessons */}
            {isModuleExpanded(module.id) && module.lessons && (
              <div className="mt-2 ml-2 sm:ml-4 space-y-1">
                {module.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson.id)}
                    className={`w-full flex items-center gap-2 sm:gap-3 p-2 rounded-md text-left transition-all duration-200 ${
                      currentLessonId === lesson.id
                        ? "bg-accent text-white"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {lesson.isCompleted ? (
                        <FaCheckCircle className="text-green-500 text-xs sm:text-sm" />
                      ) : lesson.id === currentLessonId ? (
                        <FaPlay className="text-primary text-xs sm:text-sm" />
                      ) : (
                        <FaLock className="text-gray-400 text-xs sm:text-sm" />
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
        className="lg:hidden fixed top-4 left-4 z-50 bg-primary text-white p-3 rounded-lg shadow-lg"
      >
        <FaBars className="text-lg" />
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto shadow-lg">
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={closeMobileMenu}
          />
          
          {/* Sidebar */}
          <div className="relative w-80 max-w-[85vw] bg-white h-full overflow-y-auto shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeMobileMenu}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
            >
              <FaTimes className="text-gray-600" />
            </button>
            
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
