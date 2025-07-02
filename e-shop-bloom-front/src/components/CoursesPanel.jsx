import { useState, useEffect } from "react";
import { FaPlay, FaLock, FaCheckCircle, FaStar, FaClock, FaUsers, FaShoppingCart } from "react-icons/fa";

export default function CoursesPanel({ user, onCourseSelect, onPurchase }) {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - esto vendrá de tu API

  useEffect(() => {
    // Simular carga de datos
    const loadCourses = async () => {
      setIsLoading(true);
      // Aquí harías la llamada a tu API
      setTimeout(() => {
        const mockCourses = [
          {
            id: 1,
            title: "Produccion cosmetica rentable",
            description: "Aprende a crear productos cosméticos rentables y sostenibles para tu negocio",
            image: "/images/curso-1.jpg",
            price: 99.99,
            originalPrice: 149.99,
            duration: "8 semanas",
            lessons: 32,
            students: 1250,
            rating: 4.9,
            isPurchased: user?.purchasedCourses?.includes(1) || user?.hasAllCourses,
            isPopular: true,
            level: "Intermedio",
            instructor: "Paula Martínez"
          },
          {
            id: 2,
            title: "Ritual y bienestar",
            description: "Crea velas y jabones artesanales para el cuidado personal y bienestar",
            image: "/images/curso-2.jpg",
            price: 49.99,
            originalPrice: 79.99,
            duration: "4 semanas",
            lessons: 16,
            students: 850,
            rating: 4.7,
            isPurchased: user?.purchasedCourses?.includes(2) || user?.hasAllCourses,
            isPopular: false,
            level: "Principiante",
            instructor: "Paula Martínez"
          },
          {
            id: 3,
            title: "Cosmetica para sanar",
            description: "Técnicas de cosmética natural terapéutica para el cuidado y sanación de la piel",
            image: "/images/curso-3.jpg",
            price: 79.99,
            originalPrice: 119.99,
            duration: "6 semanas",
            lessons: 24,
            students: 650,
            rating: 4.8,
            isPurchased: user?.purchasedCourses?.includes(3) || user?.hasAllCourses,
            isPopular: false,
            level: "Avanzado",
            instructor: "Paula Martínez"
          }
        ];
        setCourses(mockCourses);
        setIsLoading(false);
      }, 1000);
    };

    loadCourses();
  }, [user]);

  const handleCourseClick = (course) => {
    if (course.isPurchased) {
      onCourseSelect(course);
    }
  };

  const handleBuyAll = () => {
    const totalPrice = courses.reduce((sum, course) => sum + course.price, 0);
    const discountedPrice = totalPrice * 0.7; // 30% descuento por comprar todo
    onPurchase({
      type: 'all',
      courses: courses,
      originalPrice: totalPrice,
      finalPrice: discountedPrice,
      discount: 30
    });
  };

  const handleBuyIndividual = (course) => {
    onPurchase({
      type: 'individual',
      course: course,
      originalPrice: course.originalPrice,
      finalPrice: course.price
    });
  };

  const totalValue = courses.reduce((sum, course) => sum + course.originalPrice, 0);
  const bundlePrice = courses.reduce((sum, course) => sum + course.price, 0) * 0.7;
  const savings = totalValue - bundlePrice;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bgrosa to-pink-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/3"></div>
            <div className="h-4 bg-gray-100 rounded mb-8 w-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded mb-4 w-3/4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bgrosa to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
              #ÉxitoEnUnPote
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            ¡Bienvenid@ {user?.name}! 👋
          </h2>

          {/* Bundle Offer */}
          {!user?.hasAllCourses && (
            <div className="bg-gradient-to-r from-accent to-primary text-white p-6 rounded-2xl shadow-xl mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-yellow-400 text-black px-3 py-1 rounded-bl-lg font-bold text-sm">
                ¡OFERTA ESPECIAL!
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                Paquete Completo - ¡Ahorra ${savings.toFixed(2)}!
              </h3>
              <p className="text-sm sm:text-base mb-4 opacity-90">
                Acceso a todos los cursos con 30% de descuento
              </p>
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-lg line-through opacity-75">${totalValue.toFixed(2)}</span>
                <span className="text-2xl sm:text-3xl font-bold">${bundlePrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleBuyAll}
                className="bg-white text-primary hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <FaShoppingCart className="inline mr-2" />
                Comprar Todo Ahora
              </button>
            </div>
          )}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                course.isPurchased 
                  ? "hover:shadow-xl cursor-pointer border-2 border-green-200" 
                  : "opacity-75 cursor-not-allowed border-2 border-gray-200"
              }`}
              onClick={() => handleCourseClick(course)}
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary to-accent">
                {course.isPopular && (
                  <div className="absolute top-3 left-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                    <FaStar className="inline mr-1" />
                    Popular
                  </div>
                )}
                {course.isPurchased ? (
                  <div className="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-full">
                    <FaCheckCircle />
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-gray-400 text-white p-2 rounded-full">
                    <FaLock />
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/public/Helados.png" 
                    alt={course.title}
                    className="w-24 h-24 object-contain opacity-80"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`text-xl font-bold ${course.isPurchased ? 'text-gray-800' : 'text-gray-500'}`}>
                    {course.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    course.level === 'Principiante' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {course.level}
                  </span>
                </div>

                <p className={`text-sm mb-4 ${course.isPurchased ? 'text-gray-600' : 'text-gray-400'}`}>
                  {course.description}
                </p>

                {/* Stats */}
                <div className={`flex items-center gap-4 text-xs mb-4 ${course.isPurchased ? 'text-gray-500' : 'text-gray-400'}`}>
                  <div className="flex items-center gap-1">
                    <FaClock />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaPlay />
                    <span>{course.lessons} lecciones</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers />
                    <span>{course.students}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className={`flex items-center gap-2 mb-4 ${course.isPurchased ? 'text-yellow-500' : 'text-gray-400'}`}>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{course.rating} ({course.students} estudiantes)</span>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div>
                    {course.isPurchased ? (
                      <span className="text-green-600 font-bold text-lg">Adquirido ✓</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-sm">${course.originalPrice}</span>
                        <span className="text-primary font-bold text-lg">${course.price}</span>
                      </div>
                    )}
                  </div>

                  {course.isPurchased ? (
                    <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      <FaPlay className="inline mr-2" />
                      Continuar
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyIndividual(course);
                      }}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <FaShoppingCart className="inline mr-2" />
                      Comprar
                    </button>
                  )}
                </div>

                {/* Instructor */}
                <div className={`mt-4 pt-4 border-t border-gray-100 text-sm ${course.isPurchased ? 'text-gray-600' : 'text-gray-400'}`}>
                  <span>Instructor: {course.instructor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* User Progress Summary */}
        {user?.hasAllCourses && (
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Tu Progreso</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {courses.length}
                </div>
                <div className="text-gray-600">Cursos Disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">
                  {courses.reduce((sum, course) => sum + course.lessons, 0)}
                </div>
                <div className="text-gray-600">Lecciones Totales</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {Math.round(courses.reduce((sum, course) => sum + course.rating, 0) / courses.length * 10) / 10}
                </div>
                <div className="text-gray-600">Rating Promedio</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
