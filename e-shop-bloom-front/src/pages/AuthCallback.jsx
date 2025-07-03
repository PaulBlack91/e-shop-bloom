import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const processCallback = async () => {
      try {
        console.log('=== AuthCallback iniciado ===');
        
        // Obtener token y datos del usuario de la URL
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');

        console.log('Token:', token ? 'presente' : 'ausente');
        console.log('User param:', userParam ? 'presente' : 'ausente');

        if (token && userParam) {
          try {
            // Decodificar y parsear los datos del usuario
            const userData = JSON.parse(decodeURIComponent(userParam));
            
            console.log('Datos del usuario parseados:', userData);
            
            // Extraer el nombre del usuario para personalizar el mensaje
            setUserName(userData.name || userData.email?.split('@')[0] || 'Usuario');
            
            // Guardar en localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userData', JSON.stringify(userData));

            console.log('Datos guardados en localStorage');
            setStatus('success');
            
            // Pausa más larga para mostrar la animación de éxito
            setTimeout(() => {
              console.log('Redirigiendo al dashboard...');
              navigate('/dashboard', { replace: true });
            }, 2500);
            
          } catch (parseError) {
            console.error('Error al parsear datos del usuario:', parseError);
            throw new Error('Datos de usuario inválidos');
          }
        } else {
          console.error('Faltan datos en la URL de callback');
          console.error(`Token: ${!!token}, User: ${!!userParam}`);
          throw new Error('Datos de autenticación incompletos');
        }
      } catch (error) {
        console.error('Error en callback:', error);
        setStatus('error');
        
        // Redireccionar al inicio después de mostrar el error
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 3000);
      }
    };

    processCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full mx-4 relative z-10 border border-white/20">
        {status === 'processing' && (
          <>
            <div className="relative mb-6">
              {/* Logo de Helados con animación de carga */}
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <img 
                  src="/Helados.png" 
                  alt="Helados" 
                  className="w-full h-full object-contain animate-pulse"
                />
                {/* Spinner circular alrededor del logo */}
                <div className="absolute inset-0 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
              </div>
              
              {/* Ondas de carga */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-pink-200 rounded-full animate-ping opacity-20"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-blue-200 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
            </div>
            
            <h2 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-2">
              Completando inicio de sesión...
            </h2>
            <p className="text-gray-600 mb-4">
              Por favor espera mientras procesamos tu autenticación.
            </p>
            
            {/* Puntos de carga animados */}
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </>
        )}
        {status === 'processing' && (
          <>
            <div className="relative mb-6">
              {/* Logo de Helados con animación de carga */}
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <img 
                  src="/Helados.png" 
                  alt="Helados" 
                  className="w-full h-full object-contain animate-pulse"
                />
                {/* Spinner circular alrededor del logo */}
                <div className="absolute inset-0 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
              </div>
              
              {/* Ondas de carga */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-pink-200 rounded-full animate-ping opacity-20"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-blue-200 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.5s' }}></div>
            </div>
            
            <h2 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-2">
              Completando inicio de sesión...
            </h2>
            <p className="text-gray-600 mb-4">
              Por favor espera mientras procesamos tu autenticación.
            </p>
            
            {/* Puntos de carga animados */}
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="relative mb-6">
              {/* Logo de Helados con animación */}
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <img 
                  src="/Helados.png" 
                  alt="Helados" 
                  className="w-full h-full object-contain animate-bounce"
                  style={{ animationDuration: '1s' }}
                />
                {/* Efecto de brillo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>
              
              {/* Checkmark de éxito */}
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center transform animate-pulse shadow-lg">
                <svg 
                  className="w-8 h-8 text-white animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ animationDelay: '0.3s' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Efecto de ondas de colores */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-pink-200 rounded-full animate-ping opacity-20"></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-blue-200 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-purple-200 rounded-full animate-ping opacity-20" style={{ animationDelay: '0.4s' }}></div>
            </div>
            
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-3">
              ¡Bienvenido{userName ? `, ${userName}` : ''}! 🎉
            </h2>
            <p className="text-gray-600 mb-4">
              Tu sesión ha sido iniciada correctamente
            </p>
            
            {/* Barra de progreso animada con colores de marca */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 h-3 rounded-full animate-pulse shadow-sm relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-pink-600">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <span className="ml-2 text-sm font-medium">Accediendo al panel de control...</span>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Error de autenticación
            </h2>
            <p className="text-gray-600 mb-4">
              Hubo un problema al procesar tu inicio de sesión. Serás redirigido al inicio.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
