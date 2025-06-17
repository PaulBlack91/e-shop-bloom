// Repositorio abstracto (Puerto)
export class CourseRepository {
  async getCourse(courseId) {
    throw new Error("Method must be implemented");
  }

  async getModules(courseId) {
    throw new Error("Method must be implemented");
  }

  async getModule(moduleId) {
    throw new Error("Method must be implemented");
  }

  async getLessons(moduleId) {
    throw new Error("Method must be implemented");
  }

  async getResources(moduleId) {
    throw new Error("Method must be implemented");
  }

  async markLessonAsCompleted(lessonId) {
    throw new Error("Method must be implemented");
  }
}
