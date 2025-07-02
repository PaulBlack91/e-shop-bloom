/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {boolean} hasAllCourses
 * @property {number[]} purchasedCourses
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} Course
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} image
 * @property {number} price
 * @property {number} originalPrice
 * @property {string} duration
 * @property {number} lessons
 * @property {number} students
 * @property {number} rating
 * @property {boolean} isPurchased
 * @property {boolean} isPopular
 * @property {'Principiante'|'Intermedio'|'Avanzado'} level
 * @property {string} instructor
 */

/**
 * @typedef {Object} Lesson
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} duration
 * @property {string} videoUrl
 * @property {boolean} isCompleted
 * @property {number} order
 * @property {string} moduleId
 */

/**
 * @typedef {Object} Module
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {number} order
 * @property {Lesson[]} lessons
 * @property {number} courseId
 */

/**
 * @typedef {Object} PurchaseData
 * @property {'individual'|'all'} type
 * @property {Course} [course]
 * @property {Course[]} [courses]
 * @property {number} originalPrice
 * @property {number} finalPrice
 * @property {number} [discount]
 * @property {string} [paymentMethod]
 */

/**
 * @typedef {Object} PurchaseRequest
 * @property {'individual'|'bundle'} type
 * @property {number} [courseId]
 * @property {number[]} [courseIds]
 * @property {string} userId
 * @property {number} [discountPercentage]
 * @property {string} timestamp
 * @property {string} [paymentMethod]
 */

/**
 * @typedef {Object} PurchaseState
 * @property {boolean} isLoading
 * @property {string|null} error
 * @property {boolean} success
 */

export {};
