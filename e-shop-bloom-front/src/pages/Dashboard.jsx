import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoursesPanel from '../components/CoursesPanel';
import PurchaseModal from '../components/PurchaseModal';
import { usePurchaseManager } from '../hooks/usePurchaseManager';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const {
    purchaseLoading,
    purchaseError,
    processIndividualPurchase,
    processAllCoursesPurchase,
    clearError
  } = usePurchaseManager();

  useEffect(() => {
    // Verificar autenticación
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }

    // Cargar datos del usuario
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleCourseSelect = (course) => {
    // Navegar al curso seleccionado
    navigate(`/course/${course.id}`);
  };

  const handlePurchase = (purchaseData) => {
    setSelectedPurchase(purchaseData);
    setPurchaseModalOpen(true);
  };

  const handleConfirmPurchase = async (purchaseData) => {
    try {
      clearError();
      
      if (purchaseData.type === 'all') {
        // Compra de todos los cursos
        const courseIds = purchaseData.courses.map(course => course.id);
        await processAllCoursesPurchase(courseIds, user.id);
        
        // Actualizar estado del usuario
        const updatedUser = {
          ...user,
          hasAllCourses: true,
          purchasedCourses: courseIds
        };
        setUser(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        
        setSuccessMessage('¡Felicitaciones! Ahora tienes acceso a todos los cursos.');
      } else {
        // Compra individual
        await processIndividualPurchase(purchaseData.course.id, user.id);
        
        // Actualizar estado del usuario
        const updatedPurchases = [...(user.purchasedCourses || []), purchaseData.course.id];
        const updatedUser = {
          ...user,
          purchasedCourses: updatedPurchases
        };
        setUser(updatedUser);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        
        setSuccessMessage(`¡Perfecto! Ahora tienes acceso al curso "${purchaseData.course.title}".`);
      }
      
      setPurchaseModalOpen(false);
      setSelectedPurchase(null);
      
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Error en la compra:', error);
      // El error ya se maneja en el hook
    }
  };

  const handleClosePurchaseModal = () => {
    setPurchaseModalOpen(false);
    setSelectedPurchase(null);
    clearError();
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bgrosa to-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bgrosa to-pink-50">
      {/* Header with user info and logout */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <img 
                src="/public/Helados.png" 
                alt="Logo" 
                className="h-10 w-10"
              />
              <h1 className="text-xl font-bold text-gray-800">
The Bloom Business              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-800">{user.name}</div>
                <div className="text-xs text-gray-600">{user.email}</div>
              </div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                {user.name?.charAt(0)?.toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {successMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center justify-between">
            <span>{successMessage}</span>
            <button
              onClick={() => setSuccessMessage('')}
              className="text-green-700 hover:text-green-900"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {purchaseError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center justify-between">
            <span>Error: {purchaseError}</span>
            <button
              onClick={clearError}
              className="text-red-700 hover:text-red-900"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        <CoursesPanel
          user={user}
          onCourseSelect={handleCourseSelect}
          onPurchase={handlePurchase}
        />
      </main>

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={purchaseModalOpen}
        onClose={handleClosePurchaseModal}
        purchaseData={selectedPurchase}
        onConfirm={handleConfirmPurchase}
        isLoading={purchaseLoading}
      />
    </div>
  );
}
