import type { Enrollment, Certificate, Notification } from '../types';

export const mockEnrollments: Enrollment[] = [
  {
    id: 'enroll-1',
    userId: 'student-1',
    courseId: 'course-1',
    enrolledAt: '2024-01-20T10:00:00Z',
    lastAccessedAt: '2024-05-14T14:30:00Z',
    progress: 65,
    currentLessonId: 'lesson-1-2-2',
    lessonProgress: [
      { lessonId: 'lesson-1-1-1', completed: true, watchedSeconds: 480, completedAt: '2024-01-21T10:00:00Z' },
      { lessonId: 'lesson-1-1-2', completed: true, watchedSeconds: 900, completedAt: '2024-01-22T11:00:00Z' },
      { lessonId: 'lesson-1-1-3', completed: true, watchedSeconds: 720, completedAt: '2024-01-23T10:00:00Z' },
      { lessonId: 'lesson-1-2-1', completed: true, watchedSeconds: 1320, completedAt: '2024-01-25T10:00:00Z' },
      { lessonId: 'lesson-1-2-2', completed: false, watchedSeconds: 450, completedAt: undefined },
      { lessonId: 'lesson-1-2-3', completed: false, watchedSeconds: 0, completedAt: undefined },
    ],
    quizAttempts: 0,
  },
  {
    id: 'enroll-2',
    userId: 'student-1',
    courseId: 'course-2',
    enrolledAt: '2024-02-10T10:00:00Z',
    lastAccessedAt: '2024-05-13T09:00:00Z',
    progress: 30,
    currentLessonId: 'lesson-2-1-2',
    lessonProgress: [
      { lessonId: 'lesson-2-1-1', completed: true, watchedSeconds: 1200, completedAt: '2024-02-11T10:00:00Z' },
      { lessonId: 'lesson-2-1-2', completed: false, watchedSeconds: 600, completedAt: undefined },
    ],
    quizAttempts: 0,
  },
  {
    id: 'enroll-3',
    userId: 'student-1',
    courseId: 'course-4',
    enrolledAt: '2023-12-01T10:00:00Z',
    completedAt: '2024-03-15T10:00:00Z',
    lastAccessedAt: '2024-03-15T10:00:00Z',
    progress: 100,
    currentLessonId: 'lesson-4-2-2',
    lessonProgress: [
      { lessonId: 'lesson-4-1-1', completed: true, watchedSeconds: 2700, completedAt: '2023-12-05T10:00:00Z' },
      { lessonId: 'lesson-4-1-2', completed: true, watchedSeconds: 3300, completedAt: '2023-12-10T10:00:00Z' },
      { lessonId: 'lesson-4-1-3', completed: true, watchedSeconds: 3000, completedAt: '2023-12-15T10:00:00Z' },
      { lessonId: 'lesson-4-2-1', completed: true, watchedSeconds: 3600, completedAt: '2024-01-10T10:00:00Z' },
      { lessonId: 'lesson-4-2-2', completed: true, watchedSeconds: 4200, completedAt: '2024-03-15T10:00:00Z' },
    ],
    quizScore: 87,
    quizAttempts: 1,
  },
  {
    id: 'enroll-4',
    userId: 'student-2',
    courseId: 'course-1',
    enrolledAt: '2024-03-15T10:00:00Z',
    lastAccessedAt: '2024-05-12T10:00:00Z',
    progress: 45,
    currentLessonId: 'lesson-1-2-1',
    lessonProgress: [
      { lessonId: 'lesson-1-1-1', completed: true, watchedSeconds: 480, completedAt: '2024-03-16T10:00:00Z' },
      { lessonId: 'lesson-1-1-2', completed: true, watchedSeconds: 900, completedAt: '2024-03-17T10:00:00Z' },
      { lessonId: 'lesson-1-1-3', completed: false, watchedSeconds: 300, completedAt: undefined },
    ],
    quizAttempts: 0,
  },
  {
    id: 'enroll-5',
    userId: 'student-3',
    courseId: 'course-4',
    enrolledAt: '2024-01-05T10:00:00Z',
    completedAt: '2024-04-20T10:00:00Z',
    lastAccessedAt: '2024-04-20T10:00:00Z',
    progress: 100,
    currentLessonId: 'lesson-4-2-2',
    lessonProgress: [
      { lessonId: 'lesson-4-1-1', completed: true, watchedSeconds: 2700, completedAt: '2024-01-10T10:00:00Z' },
      { lessonId: 'lesson-4-1-2', completed: true, watchedSeconds: 3300, completedAt: '2024-01-20T10:00:00Z' },
      { lessonId: 'lesson-4-2-1', completed: true, watchedSeconds: 3600, completedAt: '2024-02-15T10:00:00Z' },
      { lessonId: 'lesson-4-2-2', completed: true, watchedSeconds: 4200, completedAt: '2024-04-20T10:00:00Z' },
    ],
    quizScore: 92,
    quizAttempts: 1,
  },
];

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    userId: 'student-1',
    courseId: 'course-4',
    courseName: 'Machine Learning Fundamentals',
    instructorName: 'David Kim',
    issuedAt: '2024-03-15T10:00:00Z',
    certificateNumber: 'LS-2024-ML-001847',
    grade: 'Distinction',
  },
  {
    id: 'cert-2',
    userId: 'student-3',
    courseId: 'course-4',
    courseName: 'Machine Learning Fundamentals',
    instructorName: 'David Kim',
    issuedAt: '2024-04-20T10:00:00Z',
    certificateNumber: 'LS-2024-ML-002103',
    grade: 'Merit',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'student-1',
    type: 'enrollment',
    title: 'Successfully enrolled!',
    message: 'You have enrolled in Machine Learning Fundamentals. Start learning now!',
    read: true,
    createdAt: '2023-12-01T10:00:00Z',
    link: '/my-learning',
  },
  {
    id: 'notif-2',
    userId: 'student-1',
    type: 'certificate',
    title: 'Certificate Earned! 🎉',
    message: 'Congratulations! You have completed Machine Learning Fundamentals and earned a certificate.',
    read: false,
    createdAt: '2024-03-15T10:00:00Z',
    link: '/certificates',
  },
  {
    id: 'notif-3',
    userId: 'student-1',
    type: 'announcement',
    title: 'New content added',
    message: 'Sarah Chen added 2 new lessons to Full Stack Web Development Bootcamp.',
    read: false,
    createdAt: '2024-05-10T10:00:00Z',
    link: '/my-learning',
  },
  {
    id: 'notif-4',
    userId: 'student-1',
    type: 'quiz',
    title: 'Quiz reminder',
    message: "Don't forget to take the Python Fundamentals Quiz to complete your learning.",
    read: false,
    createdAt: '2024-05-12T10:00:00Z',
    link: '/courses/course-1/quiz',
  },
];

export const mockAnalytics = {
  enrollmentTrends: [
    { month: 'Jan', enrollments: 420, completions: 145, revenue: 32400 },
    { month: 'Feb', enrollments: 380, completions: 162, revenue: 28900 },
    { month: 'Mar', enrollments: 510, completions: 198, revenue: 41200 },
    { month: 'Apr', enrollments: 620, completions: 234, revenue: 51800 },
    { month: 'May', enrollments: 580, completions: 212, revenue: 47600 },
    { month: 'Jun', enrollments: 710, completions: 278, revenue: 58400 },
    { month: 'Jul', enrollments: 850, completions: 321, revenue: 71200 },
    { month: 'Aug', enrollments: 920, completions: 356, revenue: 78900 },
    { month: 'Sep', enrollments: 780, completions: 298, revenue: 63400 },
    { month: 'Oct', enrollments: 940, completions: 387, revenue: 82100 },
    { month: 'Nov', enrollments: 1100, completions: 432, revenue: 97300 },
    { month: 'Dec', enrollments: 1250, completions: 498, revenue: 108700 },
  ],
  coursePerformance: [
    { courseId: 'course-1', title: 'Python Bootcamp', enrollments: 18420, completionRate: 72, avgRating: 4.8, revenue: 128400 },
    { courseId: 'course-2', title: 'Full Stack Dev', enrollments: 32150, completionRate: 68, avgRating: 4.7, revenue: 210800 },
    { courseId: 'course-3', title: 'Data Science', enrollments: 12340, completionRate: 75, avgRating: 4.9, revenue: 98200 },
    { courseId: 'course-4', title: 'Machine Learning', enrollments: 9870, completionRate: 65, avgRating: 4.8, revenue: 87600 },
    { courseId: 'course-5', title: 'React Masterclass', enrollments: 8210, completionRate: 80, avgRating: 4.9, revenue: 79400 },
  ],
  categoryDistribution: [
    { name: 'Web Dev', value: 35, color: '#4F46E5' },
    { name: 'Data Science', value: 22, color: '#0EA5E9' },
    { name: 'ML/AI', value: 18, color: '#8B5CF6' },
    { name: 'Cloud', value: 12, color: '#F59E0B' },
    { name: 'Security', value: 8, color: '#EF4444' },
    { name: 'Design', value: 5, color: '#EC4899' },
  ],
  platformStats: {
    totalUsers: 84320,
    totalStudents: 78410,
    totalInstructors: 1240,
    totalCourses: 847,
    publishedCourses: 692,
    pendingApprovals: 23,
    totalEnrollments: 245600,
    avgCompletionRate: 71,
    totalRevenue: 2840000,
    monthlyRevenue: 108700,
  },
};

export const getEnrollmentByUserAndCourse = (userId: string, courseId: string) =>
  mockEnrollments.find(e => e.userId === userId && e.courseId === courseId);

export const getEnrollmentsByUser = (userId: string) =>
  mockEnrollments.filter(e => e.userId === userId);

export const getCertificatesByUser = (userId: string) =>
  mockCertificates.filter(c => c.userId === userId);

export const getNotificationsByUser = (userId: string) =>
  mockNotifications.filter(n => n.userId === userId);
