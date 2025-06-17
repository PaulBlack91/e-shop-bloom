import { CourseRepository } from "../domain/repositories.js";
import { Course, Module, Lesson, Resource } from "../domain/entities.js";

// Implementación mock del repositorio (en producción sería una API real)
export class MockCourseRepository extends CourseRepository {
  constructor() {
    super();
    this.mockData = this.generateMockData();
  }

  async getCourse(courseId) {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.mockData.course;
  }

  async getModules(courseId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockData.modules;
  }

  async getModule(moduleId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.mockData.modules.find(m => m.id === moduleId);
  }

  async getLessons(moduleId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.mockData.lessons.filter(l => l.moduleId === moduleId);
  }

  async getResources(moduleId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.mockData.resources.filter(r => r.moduleId === moduleId);
  }

  async markLessonAsCompleted(lessonId) {
    await new Promise(resolve => setTimeout(resolve, 100));
    const lesson = this.mockData.lessons.find(l => l.id === lessonId);
    if (lesson) {
      lesson.isCompleted = true;
    }
    return lesson;
  }

  generateMockData() {
    const course = new Course(
      "exito-en-un-pote",
      "#ÉxitoEnUnPote 2.0",
      "Aprende a crear helados exitosos y rentables desde casa",
      "/images/course-thumbnail.jpg"
    );

    const modules = [
      new Module("mod-1", "Módulo 1: Fundamentos", "Bases del negocio de helados", 1),
      new Module("mod-2", "Módulo 2: Recetas Básicas", "Recetas fundamentales para empezar", 2),
      new Module("mod-3", "Módulo 3: Técnicas Avanzadas", "Técnicas profesionales", 3),
      new Module("mod-4", "Módulo 4: Marketing y Ventas", "Cómo vender tus productos", 4),
      new Module("mod-5", "Módulo 5: Gestión del Negocio", "Administra tu emprendimiento", 5),
      new Module("mod-6", "Módulo 6: Escalamiento", "Hacer crecer tu negocio", 6)
    ];



    const lessons = [
      // Módulo 1
      new Lesson("les-1-1", "Introducción al curso", "Bienvenida y overview", "https://www.youtube.com/watch?v=Qde9Y23Fh8I&ab_channel=THEBLOOMBUSINESS", "15:30", 1),
      new Lesson("les-1-2", "Equipamiento básico", "Qué necesitas para empezar", "https://example.com/video2", "22:45", 2),
      new Lesson("les-1-3", "Ingredientes esenciales", "Los mejores ingredientes", "https://example.com/video3", "18:20", 3),

      // Módulo 2
      new Lesson("les-2-1", "Helado de vainilla", "La receta base", "https://example.com/video4", "25:15", 1),
      new Lesson("les-2-2", "Helado de chocolate", "Técnica del chocolate", "https://example.com/video5", "28:30", 2),
      new Lesson("les-2-3", "Sorbetes de frutas", "Técnicas con frutas", "https://example.com/video6", "20:45", 3),

      // Módulo 3
      new Lesson("les-3-1", "Texturas cremosas", "Lograr la textura perfecta", "https://example.com/video7", "30:00", 1),
      new Lesson("les-3-2", "Sabores únicos", "Crear sabores innovadores", "https://example.com/video8", "35:20", 2),

      // Módulo 4
      new Lesson("les-4-1", "Fotografía de productos", "Cómo fotografiar helados", "https://example.com/video9", "20:15", 1),
      new Lesson("les-4-2", "Redes sociales", "Marketing en Instagram", "https://example.com/video10", "25:30", 2),

      // Módulo 5
      new Lesson("les-5-1", "Costos y precios", "Cómo calcular precios", "https://example.com/video11", "22:45", 1),
      new Lesson("les-5-2", "Control de inventario", "Gestión de stock", "https://example.com/video12", "18:30", 2),

      // Módulo 6
      new Lesson("les-6-1", "Expansión del negocio", "Crecer de forma sostenible", "https://example.com/video13", "28:15", 1),
      new Lesson("les-6-2", "Franquicias", "Modelo de franquicias", "https://example.com/video14", "32:00", 2)
    ];

    // Agregar moduleId a las lecciones
    lessons.forEach(lesson => {
      if (lesson.id.startsWith("les-1")) lesson.moduleId = "mod-1";
      else if (lesson.id.startsWith("les-2")) lesson.moduleId = "mod-2";
      else if (lesson.id.startsWith("les-3")) lesson.moduleId = "mod-3";
      else if (lesson.id.startsWith("les-4")) lesson.moduleId = "mod-4";
      else if (lesson.id.startsWith("les-5")) lesson.moduleId = "mod-5";
      else if (lesson.id.startsWith("les-6")) lesson.moduleId = "mod-6";
    });

    const resources = [
      // Módulo 1
      new Resource("res-1-1", "Lista de equipamiento", "pdf", "/downloads/equipamiento.pdf", "2.5 MB"),
      new Resource("res-1-2", "Proveedores recomendados", "pdf", "/downloads/proveedores.pdf", "1.8 MB"),

      // Módulo 2
      new Resource("res-2-1", "Recetario básico", "pdf", "/downloads/recetario-basico.pdf", "5.2 MB"),
      new Resource("res-2-2", "Tabla de conversiones", "pdf", "/downloads/conversiones.pdf", "1.2 MB"),

      // Módulo 3
      new Resource("res-3-1", "Guía de texturas", "pdf", "/downloads/texturas.pdf", "3.8 MB"),
      new Resource("res-3-2", "Plantilla de sabores", "pdf", "/downloads/plantilla-sabores.pdf", "2.1 MB"),

      // Módulo 4
      new Resource("res-4-1", "Templates para redes", "zip", "/downloads/templates-redes.zip", "15.6 MB"),
      new Resource("res-4-2", "Guía de fotografía", "pdf", "/downloads/guia-fotografia.pdf", "4.3 MB"),

      // Módulo 5
      new Resource("res-5-1", "Calculadora de costos", "xlsx", "/downloads/calculadora-costos.xlsx", "850 KB"),
      new Resource("res-5-2", "Plantilla de inventario", "xlsx", "/downloads/inventario.xlsx", "1.1 MB"),

      // Módulo 6
      new Resource("res-6-1", "Plan de expansión", "pdf", "/downloads/plan-expansion.pdf", "3.2 MB"),
      new Resource("res-6-2", "Contrato de franquicia", "pdf", "/downloads/contrato-franquicia.pdf", "2.8 MB")
    ];

    // Agregar moduleId a los recursos
    resources.forEach(resource => {
      if (resource.id.startsWith("res-1")) resource.moduleId = "mod-1";
      else if (resource.id.startsWith("res-2")) resource.moduleId = "mod-2";
      else if (resource.id.startsWith("res-3")) resource.moduleId = "mod-3";
      else if (resource.id.startsWith("res-4")) resource.moduleId = "mod-4";
      else if (resource.id.startsWith("res-5")) resource.moduleId = "mod-5";
      else if (resource.id.startsWith("res-6")) resource.moduleId = "mod-6";
    });

    return {
      course,
      modules,
      lessons,
      resources
    };
  }
}
