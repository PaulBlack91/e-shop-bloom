// Casos de uso del curso
export class GetCourseUseCase {
  constructor(courseRepository) {
    this.courseRepository = courseRepository;
  }

  async execute(courseId) {
    return await this.courseRepository.getCourse(courseId);
  }
}

export class GetModulesUseCase {
  constructor(courseRepository) {
    this.courseRepository = courseRepository;
  }

  async execute(courseId) {
    return await this.courseRepository.getModules(courseId);
  }
}

export class GetModuleUseCase {
  constructor(courseRepository) {
    this.courseRepository = courseRepository;
  }

  async execute(moduleId) {
    const module = await this.courseRepository.getModule(moduleId);
    const lessons = await this.courseRepository.getLessons(moduleId);
    const resources = await this.courseRepository.getResources(moduleId);
    
    return {
      ...module,
      lessons,
      resources
    };
  }
}

export class MarkLessonCompletedUseCase {
  constructor(courseRepository) {
    this.courseRepository = courseRepository;
  }

  async execute(lessonId) {
    return await this.courseRepository.markLessonAsCompleted(lessonId);
  }
}
