import { useState, useEffect } from "react";
import { FaPlay, FaCheckCircle, FaLock, FaChevronDown, FaChevronRight } from "react-icons/fa";

export default function CourseSidebar({ 
  modules, 
  currentModuleId, 
  currentLessonId, 
  onModuleSelect, 
  onLessonSelect,
  isLoading 
}) {
  const [expandedModules, setExpandedModules] = useState(new Set([currentModuleId]));

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

  if (isLoading) {
    return (
      <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto">
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
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          #ÉxitoEnUnPote 2.0
        </h2>
        <p className="text-sm text-gray-600">
          {modules?.length || 0} módulos disponibles
        </p>
      </div>

      <div className="p-4">
        {modules?.map((module) => (
          <div key={module.id} className="mb-4">
            {/* Module Header */}
            <button
              onClick={() => {
                toggleModule(module.id);
                onModuleSelect(module.id);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                currentModuleId === module.id
                  ? "bg-primary text-white"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">
                  Módulo {module.order}
                </span>
                <span className="text-sm font-medium truncate">
                  {module.title}
                </span>
              </div>
              {isModuleExpanded(module.id) ? (
                <FaChevronDown className="text-xs" />
              ) : (
                <FaChevronRight className="text-xs" />
              )}
            </button>

            {/* Module Lessons */}
            {isModuleExpanded(module.id) && module.lessons && (
              <div className="mt-2 ml-4 space-y-1">
                {module.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => onLessonSelect(lesson.id)}
                    className={`w-full flex items-center gap-3 p-2 rounded-md text-left transition-all duration-200 ${
                      currentLessonId === lesson.id
                        ? "bg-accent text-white"
                        : "hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {lesson.isCompleted ? (
                        <FaCheckCircle className="text-green-500 text-sm" />
                      ) : lesson.id === currentLessonId ? (
                        <FaPlay className="text-primary text-sm" />
                      ) : (
                        <FaLock className="text-gray-400 text-sm" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
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
    </div>
  );
}
