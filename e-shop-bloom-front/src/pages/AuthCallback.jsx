import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing');

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
            
            // Guardar en localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userData', JSON.stringify(userData));

            console.log('Datos guardados en localStorage');
            setStatus('success');
            
            // Pequeña pausa para mostrar el estado de éxito
            setTimeout(() => {
              console.log('Redirigiendo al dashboard...');
              navigate('/dashboard', { replace: true });
            }, 500);
            
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md w-full mx-4">
        {status === 'processing' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Completando inicio de sesión...
            </h2>
            <p className="text-gray-600">
              Por favor espera mientras procesamos tu autenticación.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              ¡Bienvenido!
            </h2>
            <p className="text-gray-600">
              Redirigiendo al panel de control...
            </p>
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
