// Entidades del dominio
export class Course {
  constructor(
    id,
    title,
    description,
    thumbnail,
    modules = []
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
    this.modules = modules;
  }
}

export class Module {
  constructor(
    id,
    title,
    description,
    order,
    lessons = [],
    resources = []
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.order = order;
    this.lessons = lessons;
    this.resources = resources;
  }
}

export class Lesson {
  constructor(
    id,
    title,
    description,
    videoUrl,
    duration,
    order,
    isCompleted = false
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.videoUrl = videoUrl;
    this.duration = duration;
    this.order = order;
    this.isCompleted = isCompleted;
  }
}

export class Resource {
  constructor(
    id,
    title,
    type, // 'pdf', 'document', 'template', etc.
    downloadUrl,
    size
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.downloadUrl = downloadUrl;
    this.size = size;
  }
}
