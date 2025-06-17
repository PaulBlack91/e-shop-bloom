import { MockCourseRepository } from "../course/infrastructure/MockCourseRepository.js";
import { 
  GetCourseUseCase, 
  GetModulesUseCase, 
  GetModuleUseCase, 
  MarkLessonCompletedUseCase 
} from "../course/application/useCases.js";

// Contenedor de dependencias siguiendo inyección de dependencias
class CourseContainer {
  constructor() {
    // Repositories (Adapters)
    this.courseRepository = new MockCourseRepository();

    // Use Cases (Application Layer)
    this.getCourseUseCase = new GetCourseUseCase(this.courseRepository);
    this.getModulesUseCase = new GetModulesUseCase(this.courseRepository);
    this.getModuleUseCase = new GetModuleUseCase(this.courseRepository);
    this.markLessonCompletedUseCase = new MarkLessonCompletedUseCase(this.courseRepository);
  }
}

// Singleton del contenedor
const courseContainer = new CourseContainer();

export default courseContainer;
