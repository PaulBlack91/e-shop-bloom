import { FaDownload, FaFilePdf, FaFileExcel, FaFileArchive, FaFile } from "react-icons/fa";

export default function ResourcesSection({ resources, isLoading }) {
  const getResourceIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FaFilePdf className="text-red-500" />;
      case 'xlsx':
      case 'xls':
        return <FaFileExcel className="text-green-500" />;
      case 'zip':
      case 'rar':
        return <FaFileArchive className="text-yellow-500" />;
      default:
        return <FaFile className="text-gray-500" />;
    }
  };

  const handleDownload = (resource) => {
    // En producción, esto sería una llamada real a la API
    console.log(`Descargando: ${resource.title}`);
    
    // Simular descarga
    const link = document.createElement('a');
    link.href = resource.downloadUrl;
    link.download = resource.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div className="animate-pulse">
          <div className="h-5 sm:h-6 bg-gray-200 rounded mb-3 sm:mb-4"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg mb-3">
              <div className="flex items-center gap-3 sm:gap-4 flex-1">
                <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-2 sm:h-3 bg-gray-100 rounded w-16 sm:w-20"></div>
                </div>
              </div>
              <div className="w-full sm:w-20 h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!resources || resources.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
          Recursos para descargar
        </h3>
        <div className="text-center py-6 sm:py-8 text-gray-500">
          <FaFile className="text-3xl sm:text-4xl mx-auto mb-3 opacity-50" />
          <p className="text-sm sm:text-base">No hay recursos disponibles para este módulo</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center gap-2">
        <FaDownload className="text-primary" />
        Recursos para descargar
      </h3>

      <div className="space-y-3">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all duration-200"
          >
            {/* Resource Icon and Info */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="flex-shrink-0 text-xl sm:text-2xl">
                {getResourceIcon(resource.type)}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 truncate text-sm sm:text-base">
                  {resource.title}
                </h4>
                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500">
                  <span className="uppercase font-medium">{resource.type}</span>
                  <span>•</span>
                  <span>{resource.size}</span>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={() => handleDownload(resource)}
              className="flex items-center justify-center gap-2 bg-primary text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 w-full sm:w-auto"
            >
              <FaDownload className="text-sm" />
              <span className="text-sm sm:text-base">Descargar</span>
            </button>
          </div>
        ))}
      </div>

      {/* Download All Button */}
      {resources.length > 1 && (
        <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              resources.forEach(resource => handleDownload(resource));
            }}
            className="w-full bg-accent text-white py-3 px-4 rounded-lg hover:bg-accent/90 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <FaDownload />
            <span>Descargar todos los recursos ({resources.length})</span>
          </button>
        </div>
      )}
    </div>
  );
}
