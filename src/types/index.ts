// ─── User & Auth ───────────────────────────────────────────────────────────
export type UserRole = 'student' | 'instructor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  headline?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  location?: string;
  joinedAt: string;
  isActive: boolean;
  enrolledCourses?: string[];
  completedCourses?: string[];
  wishlist?: string[];
  totalLearningHours?: number;
  streak?: number;
  certificates?: string[];
}

// ─── Category ──────────────────────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  courseCount: number;
  description: string;
}

// ─── Course ────────────────────────────────────────────────────────────────
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type CourseStatus = 'draft' | 'published' | 'pending' | 'rejected';

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'video' | 'zip';
  url: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number; // in minutes
  isPreview: boolean;
  resources: Resource[];
  order: number;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'multiple-answer';
  options: string[];
  correctAnswers: number[]; // indices into options array
  explanation?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  passingScore: number; // percentage 0-100
  timeLimit?: number; // in minutes, optional
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar?: string;
  category: string;
  categoryId: string;
  thumbnail: string;
  previewVideo?: string;
  difficulty: Difficulty;
  language: string;
  tags: string[];
  whatYouLearn: string[];
  requirements: string[];
  sections: Section[];
  quiz?: Quiz;
  reviews: Review[];
  rating: number;
  totalReviews: number;
  totalStudents: number;
  totalDuration: number; // in minutes
  totalLessons: number;
  price: number;
  originalPrice?: number;
  isFree: boolean;
  status: CourseStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  featured: boolean;
  bestseller: boolean;
  certificate: boolean;
}

// ─── Enrollment & Progress ─────────────────────────────────────────────────
export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  watchedSeconds: number;
  completedAt?: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  completedAt?: string;
  progress: number; // 0-100 percentage
  lastAccessedAt: string;
  lessonProgress: LessonProgress[];
  currentLessonId?: string;
  quizScore?: number;
  quizAttempts: number;
}

// ─── Certificate ───────────────────────────────────────────────────────────
export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  instructorName: string;
  issuedAt: string;
  certificateNumber: string;
  grade?: string;
}

// ─── Quiz Attempt ──────────────────────────────────────────────────────────
export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  courseId: string;
  answers: { questionId: string; selectedAnswers: number[] }[];
  score: number;
  passed: boolean;
  submittedAt: string;
  timeTaken?: number; // seconds
}

// ─── Notification ──────────────────────────────────────────────────────────
export type NotificationType = 'enrollment' | 'completion' | 'quiz' | 'review' | 'announcement' | 'certificate';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

// ─── Analytics ─────────────────────────────────────────────────────────────
export interface EnrollmentTrend {
  month: string;
  enrollments: number;
  completions: number;
  revenue: number;
}

export interface CoursePerformance {
  courseId: string;
  title: string;
  enrollments: number;
  completionRate: number;
  avgRating: number;
  revenue: number;
}

// ─── Forms ─────────────────────────────────────────────────────────────────
export interface LoginForm {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

export interface CourseForm {
  title: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  difficulty: Difficulty;
  language: string;
  price: number;
  originalPrice: number;
  isFree: boolean;
  thumbnail: string;
  previewVideo: string;
  whatYouLearn: string[];
  requirements: string[];
  tags: string[];
}

// ─── Filter & Sort ─────────────────────────────────────────────────────────
export interface CourseFilter {
  category: string;
  difficulty: Difficulty | '';
  priceType: 'all' | 'free' | 'paid';
  minRating: number;
  duration: 'any' | 'short' | 'medium' | 'long';
}

export type CourseSortBy = 'newest' | 'popular' | 'rating' | 'price-low' | 'price-high';
