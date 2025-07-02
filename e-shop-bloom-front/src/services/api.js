// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Servicio para manejar las llamadas HTTP
 */
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Método base para hacer peticiones HTTP
   * @param {string} endpoint 
   * @param {Object} options 
   * @returns {Promise<any>}
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('authToken');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  /**
   * Métodos HTTP
   */
  get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }
}

// Instancia singleton del servicio API
const apiService = new ApiService();

/**
 * Servicios específicos para diferentes recursos
 */

// Servicio de autenticación
export const authService = {
  /**
   * Iniciar sesión
   * @param {Object} credentials 
   * @param {string} credentials.email
   * @param {string} credentials.password
   */
  async login(credentials) {
    return apiService.post('/auth/login', credentials);
  },

  /**
   * Registrar usuario
   * @param {Object} userData 
   */
  async register(userData) {
    return apiService.post('/auth/register', userData);
  },

  /**
   * Cerrar sesión
   */
  async logout() {
    return apiService.post('/auth/logout');
  },

  /**
   * Refrescar token
   */
  async refreshToken() {
    return apiService.post('/auth/refresh');
  },

  /**
   * Verificar token
   */
  async verifyToken() {
    return apiService.get('/auth/verify');
  }
};

// Servicio de cursos
export const coursesService = {
  /**
   * Obtener todos los cursos
   */
  async getAllCourses() {
    return apiService.get('/courses');
  },

  /**
   * Obtener curso por ID
   * @param {number} courseId 
   */
  async getCourseById(courseId) {
    return apiService.get(`/courses/${courseId}`);
  },

  /**
   * Obtener módulos de un curso
   * @param {number} courseId 
   */
  async getCourseModules(courseId) {
    return apiService.get(`/courses/${courseId}/modules`);
  },

  /**
   * Obtener lecciones de un módulo
   * @param {string} moduleId 
   */
  async getModuleLessons(moduleId) {
    return apiService.get(`/modules/${moduleId}/lessons`);
  },

  /**
   * Marcar lección como completada
   * @param {string} lessonId 
   */
  async markLessonCompleted(lessonId) {
    return apiService.post(`/lessons/${lessonId}/complete`);
  }
};

// Servicio de usuarios
export const userService = {
  /**
   * Obtener perfil del usuario
   */
  async getProfile() {
    return apiService.get('/users/profile');
  },

  /**
   * Actualizar perfil del usuario
   * @param {Object} profileData 
   */
  async updateProfile(profileData) {
    return apiService.put('/users/profile', profileData);
  },

  /**
   * Obtener cursos del usuario
   */
  async getUserCourses() {
    return apiService.get('/users/courses');
  },

  /**
   * Obtener progreso del usuario
   */
  async getUserProgress() {
    return apiService.get('/users/progress');
  }
};

// Servicio de compras
export const purchaseService = {
  /**
   * Procesar compra individual
   * @param {Object} purchaseData 
   */
  async purchaseIndividualCourse(purchaseData) {
    return apiService.post('/purchases/individual', purchaseData);
  },

  /**
   * Procesar compra de todos los cursos
   * @param {Object} purchaseData 
   */
  async purchaseAllCourses(purchaseData) {
    return apiService.post('/purchases/bundle', purchaseData);
  },

  /**
   * Obtener historial de compras
   */
  async getPurchaseHistory() {
    return apiService.get('/purchases/history');
  },

  /**
   * Verificar estado de compra
   * @param {string} purchaseId 
   */
  async verifyPurchase(purchaseId) {
    return apiService.get(`/purchases/${purchaseId}/verify`);
  }
};

// Servicio de pagos
export const paymentService = {
  /**
   * Crear intención de pago
   * @param {Object} paymentData 
   */
  async createPaymentIntent(paymentData) {
    return apiService.post('/payments/create-intent', paymentData);
  },

  /**
   * Confirmar pago
   * @param {string} paymentIntentId 
   */
  async confirmPayment(paymentIntentId) {
    return apiService.post(`/payments/${paymentIntentId}/confirm`);
  },

  /**
   * Obtener métodos de pago disponibles
   */
  async getPaymentMethods() {
    return apiService.get('/payments/methods');
  }
};

export default apiService;
