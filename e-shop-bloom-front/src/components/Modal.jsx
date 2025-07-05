import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function Modal({ isOpen, onClose, title, children, size = "md" }) {
  // Cerrar modal con ESC
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Definir tamaños del modal
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
        >
          {/* Overlay/Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className={`modal-content bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto mx-4 relative overflow-hidden`}
          >
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-5 left-5 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-5 w-12 h-12 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20 backdrop-blur-sm relative z-10">
              <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 relative z-10"
              >
                <FiX className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 relative z-10">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
