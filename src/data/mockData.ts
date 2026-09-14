import type {
  User, Course, Category, Enrollment, Certificate,
  Quiz, Review, Section, Lesson, Notification, EnrollmentTrend
} from '../types';

// ─── Categories ─────────────────────────────────────────────────────────────
export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Web Development', slug: 'web-development', icon: '🌐', color: '#4F46E5', courseCount: 142, description: 'Build modern web applications' },
  { id: 'cat-2', name: 'Data Science', slug: 'data-science', icon: '📊', color: '#059669', courseCount: 98, description: 'Analyze data and build ML models' },
  { id: 'cat-3', name: 'Mobile Development', slug: 'mobile-development', icon: '📱', color: '#D97706', courseCount: 67, description: 'Create iOS and Android apps' },
  { id: 'cat-4', name: 'Cybersecurity', slug: 'cybersecurity', icon: '🔒', color: '#DC2626', courseCount: 45, description: 'Protect systems and networks' },
  { id: 'cat-5', name: 'Cloud Computing', slug: 'cloud-computing', icon: '☁️', color: '#2563EB', courseCount: 83, description: 'Master cloud platforms and DevOps' },
  { id: 'cat-6', name: 'UI/UX Design', slug: 'ui-ux-design', icon: '🎨', color: '#7C3AED', courseCount: 54, description: 'Design beautiful user experiences' },
  { id: 'cat-7', name: 'Python', slug: 'python', icon: '🐍', color: '#0891B2', courseCount: 76, description: 'Master Python programming' },
  { id: 'cat-8', name: 'Machine Learning', slug: 'machine-learning', icon: '🤖', color: '#BE185D', courseCount: 61, description: 'Build intelligent AI systems' },
];

// ─── Users ──────────────────────────────────────────────────────────────────
export const mockInstructors: User[] = [
  {
    id: 'inst-1', name: 'Dr. Sarah Mitchell', email: 'sarah@learnsphere.com', role: 'instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah', headline: 'Senior Software Engineer & Educator',
    bio: 'PhD in Computer Science from MIT. 12 years teaching programming. Helped 50,000+ students land tech jobs.',
    location: 'San Francisco, CA', joinedAt: '2022-01-15', isActive: true,
    website: 'https://sarahmitchell.dev', linkedin: 'sarah-mitchell',
  },
  {
    id: 'inst-2', name: 'Marcus Johnson', email: 'marcus@learnsphere.com', role: 'instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus', headline: 'Full Stack Developer & Tech Lead',
    bio: 'Ex-Google engineer with 10 years of industry experience. Passionate about making complex topics simple.',
    location: 'New York, NY', joinedAt: '2022-03-20', isActive: true,
  },
  {
    id: 'inst-3', name: 'Elena Rodriguez', email: 'elena@learnsphere.com', role: 'instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena', headline: 'Data Scientist & ML Engineer',
    bio: 'Data science practitioner with experience at Amazon and Netflix. Specializing in ML and AI applications.',
    location: 'Seattle, WA', joinedAt: '2022-06-10', isActive: true,
  },
  {
    id: 'inst-4', name: 'James Chen', email: 'james@learnsphere.com', role: 'instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james', headline: 'Cybersecurity Expert & CISSP',
    bio: 'Certified cybersecurity professional with 15 years securing enterprise systems. Former military cyber officer.',
    location: 'Washington, DC', joinedAt: '2022-09-05', isActive: true,
  },
  {
    id: 'inst-5', name: 'Priya Sharma', email: 'priya@learnsphere.com', role: 'instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya', headline: 'AWS Certified Cloud Architect',
    bio: 'Cloud solutions architect with 8 years at AWS. Helping companies migrate to and optimize cloud infrastructure.',
    location: 'Austin, TX', joinedAt: '2023-01-12', isActive: true,
  },
  {
    id: 'inst-6', name: 'Alex Thompson', email: 'alex@learnsphere.com', role: 'instructor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex', headline: 'UX Designer & Creative Director',
    bio: 'Award-winning UX designer with 10 years in product design. Worked with Apple, Airbnb, and Spotify.',
    location: 'Los Angeles, CA', joinedAt: '2023-03-18', isActive: true,
  },
];

export const mockStudents: User[] = [
  {
    id: 'student-1', name: 'Alex Johnson', email: 'alex.j@email.com', role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alexj',
    bio: 'Aspiring software engineer, learning every day.', location: 'Chicago, IL',
    joinedAt: '2023-06-15', isActive: true, streak: 7, totalLearningHours: 48,
    enrolledCourses: ['course-1', 'course-2', 'course-3'],
    completedCourses: ['course-1'],
    certificates: ['cert-1'],
    wishlist: ['course-4', 'course-5'],
  },
  { id: 'student-2', name: 'Maria Garcia', email: 'maria.g@email.com', role: 'student', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mariag', joinedAt: '2023-07-20', isActive: true, streak: 3, totalLearningHours: 32, enrolledCourses: ['course-2', 'course-4'], completedCourses: [], wishlist: ['course-1'], },
  { id: 'student-3', name: 'David Kim', email: 'david.k@email.com', role: 'student', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=davidk', joinedAt: '2023-08-05', isActive: true, streak: 14, totalLearningHours: 72, enrolledCourses: ['course-1', 'course-5', 'course-6'], completedCourses: ['course-5'], wishlist: [], },
  { id: 'student-4', name: 'Emma Wilson', email: 'emma.w@email.com', role: 'student', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emmaw', joinedAt: '2023-09-10', isActive: true, streak: 21, totalLearningHours: 95, enrolledCourses: ['course-3', 'course-7', 'course-8'], completedCourses: ['course-3', 'course-7'], wishlist: ['course-2'], },
  { id: 'student-5', name: 'Ryan Patel', email: 'ryan.p@email.com', role: 'student', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ryanp', joinedAt: '2023-10-01', isActive: false, streak: 0, totalLearningHours: 12, enrolledCourses: ['course-4'], completedCourses: [], wishlist: [], },
];

export const mockAdmin: User = {
  id: 'admin-1', name: 'Admin User', email: 'admin@learnsphere.com', role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  headline: 'Platform Administrator', joinedAt: '2022-01-01', isActive: true,
};

// ─── Lessons helper ─────────────────────────────────────────────────────────
const makeLessons = (sectionIdx: number, count: number): Lesson[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `lesson-s${sectionIdx}-${i + 1}`,
    title: [
      'Introduction and Setup', 'Core Concepts Explained', 'Hands-on Project',
      'Deep Dive & Advanced Topics', 'Best Practices', 'Common Pitfalls', 'Final Review'
    ][i % 7] + (i > 6 ? ` Part ${Math.floor(i / 7) + 1}` : ''),
    description: 'In this lesson, you\'ll learn the fundamental concepts and apply them through practical exercises.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: 8 + (i * 3) % 25,
    isPreview: i === 0,
    resources: i % 2 === 0 ? [{ id: `res-${sectionIdx}-${i}`, title: 'Lesson Notes PDF', type: 'pdf', url: '#' }] : [],
    order: i + 1,
  }));

const makeSection = (courseIdx: number, sIdx: number, title: string, lessonCount: number): Section => ({
  id: `section-c${courseIdx}-s${sIdx}`,
  title,
  description: `Master ${title.toLowerCase()} with hands-on exercises and real-world examples.`,
  lessons: makeLessons(sIdx * 10 + courseIdx, lessonCount),
  order: sIdx,
});

// ─── Reviews ────────────────────────────────────────────────────────────────
const makeReviews = (courseId: string): Review[] => [
  { id: `rev-${courseId}-1`, userId: 'student-1', userName: 'Alex Johnson', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alexj', rating: 5, comment: 'Absolutely incredible course! The instructor explains complex topics so clearly. This course completely changed my career trajectory. Highly recommended!', createdAt: '2024-08-15', helpful: 42 },
  { id: `rev-${courseId}-2`, userId: 'student-2', userName: 'Maria Garcia', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mariag', rating: 4, comment: 'Great course overall. Very well structured and the projects are practical. Would love more advanced exercises but still 5 stars for the quality.', createdAt: '2024-07-22', helpful: 28 },
  { id: `rev-${courseId}-3`, userId: 'student-3', userName: 'David Kim', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=davidk', rating: 5, comment: 'Best investment I\'ve made in my education. The content is up-to-date, practical, and taught by someone who clearly knows their stuff. Already got a job offer!', createdAt: '2024-06-10', helpful: 61 },
  { id: `rev-${courseId}-4`, userId: 'student-4', userName: 'Emma Wilson', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emmaw', rating: 5, comment: 'I\'ve taken many online courses but this one stands out. The projects are real-world applicable and the instructor provides thorough explanations. Worth every penny!', createdAt: '2024-05-18', helpful: 35 },
];

const makeQuiz = (courseId: string): Quiz => ({
  id: `quiz-${courseId}`,
  courseId,
  title: 'Course Assessment',
  description: 'Test your knowledge of the key concepts covered in this course.',
  passingScore: 70,
  timeLimit: 30,
  questions: [
    {
      id: `q-${courseId}-1`, type: 'multiple-choice',
      text: 'Which of the following is the best practice for code reusability?',
      options: ['Copy-pasting code', 'Creating reusable functions/components', 'Writing everything in one file', 'Ignoring DRY principles'],
      correctAnswers: [1], explanation: 'Creating reusable functions and components follows the DRY (Don\'t Repeat Yourself) principle.',
    },
    {
      id: `q-${courseId}-2`, type: 'true-false',
      text: 'Version control systems like Git are essential tools for modern software development.',
      options: ['True', 'False'],
      correctAnswers: [0], explanation: 'Git and version control are fundamental tools used by virtually all professional developers.',
    },
    {
      id: `q-${courseId}-3`, type: 'multiple-choice',
      text: 'What does API stand for?',
      options: ['Application Programming Interface', 'Automated Program Interaction', 'Application Process Integration', 'Advanced Programming Interface'],
      correctAnswers: [0], explanation: 'API stands for Application Programming Interface — a way for programs to communicate.',
    },
    {
      id: `q-${courseId}-4`, type: 'multiple-answer',
      text: 'Which of the following are valid HTTP methods? (Select all that apply)',
      options: ['GET', 'POST', 'FETCH', 'PUT', 'DELETE', 'SEND'],
      correctAnswers: [0, 1, 3, 4], explanation: 'GET, POST, PUT, and DELETE are standard HTTP methods. FETCH and SEND are not.',
    },
    {
      id: `q-${courseId}-5`, type: 'multiple-choice',
      text: 'What is the purpose of a database index?',
      options: ['To store data permanently', 'To speed up data retrieval', 'To encrypt sensitive data', 'To backup data automatically'],
      correctAnswers: [1], explanation: 'Database indexes improve query performance by allowing faster data lookup.',
    },
  ],
});

// ─── Courses ─────────────────────────────────────────────────────────────────
export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Complete Python Bootcamp: From Zero to Hero',
    slug: 'complete-python-bootcamp',
    shortDescription: 'Master Python programming from basics to advanced topics. Build real projects and land your dream job.',
    description: `This comprehensive Python course takes you from absolute beginner to professional developer. You'll learn Python syntax, data structures, OOP, file handling, APIs, web scraping, and much more through hands-on projects.\n\nBy the end of this course, you'll have built 15+ real-world projects and have the confidence to apply for Python developer roles.`,
    instructorId: 'inst-1', instructorName: 'Dr. Sarah Mitchell',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    category: 'Python', categoryId: 'cat-7',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    previewVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    difficulty: 'Beginner', language: 'English',
    tags: ['python', 'programming', 'backend', 'automation'],
    whatYouLearn: [
      'Master Python fundamentals and advanced concepts',
      'Build 15+ real-world Python projects',
      'Work with databases, APIs, and web scraping',
      'Object-Oriented Programming principles',
      'Automate tasks and workflows with Python',
      'Deploy Python applications to the cloud',
    ],
    requirements: ['No prior programming experience needed', 'A computer with internet access', 'Enthusiasm to learn!'],
    sections: [
      makeSection(1, 1, 'Python Fundamentals', 5),
      makeSection(1, 2, 'Data Structures & Algorithms', 6),
      makeSection(1, 3, 'Object-Oriented Programming', 5),
      makeSection(1, 4, 'File Handling & APIs', 4),
      makeSection(1, 5, 'Projects & Final Capstone', 3),
    ],
    quiz: makeQuiz('course-1'),
    reviews: makeReviews('course-1'),
    rating: 4.8, totalReviews: 12847, totalStudents: 87342,
    totalDuration: 42 * 60, totalLessons: 23, price: 89.99, originalPrice: 199.99,
    isFree: false, status: 'published', featured: true, bestseller: true, certificate: true,
    createdAt: '2023-01-15', updatedAt: '2024-06-01', publishedAt: '2023-02-01',
  },
  {
    id: 'course-2',
    title: 'Full Stack Web Development Bootcamp',
    slug: 'full-stack-web-development',
    shortDescription: 'Learn HTML, CSS, JavaScript, React, Node.js and more. Become a job-ready full stack developer.',
    description: `The most comprehensive full stack web development course on the platform. You'll master both frontend and backend technologies to build complete web applications from scratch.\n\nFrom HTML basics to deploying production apps, this course covers everything you need to become a professional full stack developer.`,
    instructorId: 'inst-2', instructorName: 'Marcus Johnson',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
    category: 'Web Development', categoryId: 'cat-1',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    previewVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    difficulty: 'Intermediate', language: 'English',
    tags: ['html', 'css', 'javascript', 'react', 'nodejs', 'mongodb'],
    whatYouLearn: [
      'HTML5, CSS3, and modern JavaScript (ES6+)',
      'React.js with hooks and state management',
      'Node.js and Express.js for backend development',
      'MongoDB database design and integration',
      'REST API design and implementation',
      'Git, deployment, and production best practices',
    ],
    requirements: ['Basic computer skills', 'Willingness to learn', 'Patience and persistence'],
    sections: [
      makeSection(2, 1, 'HTML & CSS Foundations', 6),
      makeSection(2, 2, 'JavaScript Essentials', 7),
      makeSection(2, 3, 'React.js Development', 6),
      makeSection(2, 4, 'Node.js & Express Backend', 5),
      makeSection(2, 5, 'Database & Deployment', 4),
    ],
    quiz: makeQuiz('course-2'),
    reviews: makeReviews('course-2'),
    rating: 4.9, totalReviews: 21453, totalStudents: 134521,
    totalDuration: 65 * 60, totalLessons: 28, price: 109.99, originalPrice: 249.99,
    isFree: false, status: 'published', featured: true, bestseller: true, certificate: true,
    createdAt: '2023-02-10', updatedAt: '2024-07-15', publishedAt: '2023-03-01',
  },
  {
    id: 'course-3',
    title: 'Data Science with Python & Pandas',
    slug: 'data-science-python-pandas',
    shortDescription: 'Complete data science curriculum: data analysis, visualization, statistics, and ML with Python.',
    description: `Dive deep into data science using Python. Learn to analyze, visualize, and derive insights from complex datasets. This course covers the complete data science workflow from data cleaning to advanced statistical analysis and machine learning.\n\nYou'll work with real-world datasets from Kaggle and industry sources.`,
    instructorId: 'inst-3', instructorName: 'Elena Rodriguez',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena',
    category: 'Data Science', categoryId: 'cat-2',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    previewVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    difficulty: 'Intermediate', language: 'English',
    tags: ['python', 'pandas', 'numpy', 'matplotlib', 'data science'],
    whatYouLearn: [
      'NumPy for numerical computing', 'Pandas for data manipulation',
      'Matplotlib and Seaborn for visualization', 'Statistical analysis and hypothesis testing',
      'Machine learning with scikit-learn', 'Real-world data science projects',
    ],
    requirements: ['Basic Python knowledge', 'High school mathematics', 'Curiosity for data'],
    sections: [
      makeSection(3, 1, 'Python for Data Science', 5),
      makeSection(3, 2, 'NumPy & Pandas', 6),
      makeSection(3, 3, 'Data Visualization', 5),
      makeSection(3, 4, 'Statistical Analysis', 4),
      makeSection(3, 5, 'Machine Learning Introduction', 5),
    ],
    quiz: makeQuiz('course-3'),
    reviews: makeReviews('course-3'),
    rating: 4.7, totalReviews: 8934, totalStudents: 54321,
    totalDuration: 38 * 60, totalLessons: 25, price: 79.99, originalPrice: 179.99,
    isFree: false, status: 'published', featured: false, bestseller: true, certificate: true,
    createdAt: '2023-04-20', updatedAt: '2024-05-10', publishedAt: '2023-05-01',
  },
  {
    id: 'course-4',
    title: 'Machine Learning Fundamentals & Applications',
    slug: 'machine-learning-fundamentals',
    shortDescription: 'From linear regression to deep learning. Master ML algorithms and deploy real AI applications.',
    description: `Master machine learning from the ground up. This course covers classical ML algorithms, neural networks, deep learning, and practical model deployment. You'll implement algorithms from scratch and use industry tools like TensorFlow and scikit-learn.`,
    instructorId: 'inst-3', instructorName: 'Elena Rodriguez',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena',
    category: 'Machine Learning', categoryId: 'cat-8',
    thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    previewVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    difficulty: 'Advanced', language: 'English',
    tags: ['machine learning', 'deep learning', 'tensorflow', 'neural networks', 'AI'],
    whatYouLearn: [
      'Supervised and unsupervised learning algorithms', 'Neural networks and deep learning',
      'Model evaluation and hyperparameter tuning', 'TensorFlow and Keras implementation',
      'Computer vision and NLP basics', 'Model deployment with FastAPI',
    ],
    requirements: ['Python intermediate skills', 'Linear algebra basics', 'Statistics fundamentals'],
    sections: [
      makeSection(4, 1, 'ML Foundations', 5),
      makeSection(4, 2, 'Supervised Learning', 6),
      makeSection(4, 3, 'Unsupervised Learning', 4),
      makeSection(4, 4, 'Neural Networks & Deep Learning', 6),
      makeSection(4, 5, 'Model Deployment', 3),
    ],
    quiz: makeQuiz('course-4'),
    reviews: makeReviews('course-4'),
    rating: 4.8, totalReviews: 6521, totalStudents: 38742,
    totalDuration: 45 * 60, totalLessons: 24, price: 129.99, originalPrice: 299.99,
    isFree: false, status: 'published', featured: true, bestseller: false, certificate: true,
    createdAt: '2023-06-15', updatedAt: '2024-08-01', publishedAt: '2023-07-01',
  },
  {
    id: 'course-5',
    title: 'React Masterclass: Build Modern Web Apps',
    slug: 'react-masterclass',
    shortDescription: 'Deep dive into React 18, hooks, context, Redux Toolkit, TypeScript, and Next.js.',
    description: `The most advanced React course available. Move beyond basics and master the complete React ecosystem including hooks, context, Redux Toolkit, React Query, TypeScript, testing, and Next.js. Build production-grade applications.`,
    instructorId: 'inst-2', instructorName: 'Marcus Johnson',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
    category: 'Web Development', categoryId: 'cat-1',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    previewVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    difficulty: 'Intermediate', language: 'English',
    tags: ['react', 'typescript', 'nextjs', 'redux', 'hooks'],
    whatYouLearn: [
      'React 18 features and concurrent mode', 'Custom hooks and advanced patterns',
      'State management with Redux Toolkit', 'Data fetching with React Query',
      'TypeScript with React', 'Testing with Jest and React Testing Library',
    ],
    requirements: ['JavaScript ES6+ knowledge', 'Basic React understanding', 'HTML & CSS proficiency'],
    sections: [
      makeSection(5, 1, 'React 18 & Hooks Deep Dive', 6),
      makeSection(5, 2, 'State Management', 5),
      makeSection(5, 3, 'Performance Optimization', 4),
      makeSection(5, 4, 'TypeScript Integration', 5),
      makeSection(5, 5, 'Testing & Production', 4),
    ],
    quiz: makeQuiz('course-5'),
    reviews: makeReviews('course-5'),
    rating: 4.9, totalReviews: 9827, totalStudents: 61234,
    totalDuration: 36 * 60, totalLessons: 24, price: 99.99, originalPrice: 219.99,
    isFree: false, status: 'published', featured: true, bestseller: true, certificate: true,
    createdAt: '2023-08-01', updatedAt: '2024-09-01', publishedAt: '2023-08-15',
  },
  {
    id: 'course-6',
    title: 'Cyber Security Essentials & Ethical Hacking',
    slug: 'cyber-security-essentials',
    shortDescription: 'Learn ethical hacking, penetration testing, network security, and get ready for CompTIA Security+.',
    description: `Become a cybersecurity professional. This course covers network security fundamentals, ethical hacking techniques, penetration testing methodologies, incident response, and prepares you for industry certifications like CompTIA Security+ and CEH.`,
    instructorId: 'inst-4', instructorName: 'James Chen',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
    category: 'Cybersecurity', categoryId: 'cat-4',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    previewVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    difficulty: 'Intermediate', language: 'English',
    tags: ['cybersecurity', 'ethical hacking', 'penetration testing', 'network security'],
    whatYouLearn: [
      'Network security fundamentals', 'Ethical hacking methodology',
      'Penetration testing tools (Kali Linux, Metasploit)', 'Web application security',
      'Incident response and forensics', 'Preparation for Security+ certification',
    ],
    requirements: ['Basic networking knowledge', 'Command line familiarity', 'Commitment to ethical use only'],
    sections: [
      makeSection(6, 1, 'Security Fundamentals', 5),
      makeSection(6, 2, 'Network Security', 6),
      makeSection(6, 3, 'Ethical Hacking', 5),
      makeSection(6, 4, 'Web Application Security', 4),
      makeSection(6, 5, 'Certification Prep', 3),
    ],
    quiz: makeQuiz('course-6'),
    reviews: makeReviews('course-6'),
    rating: 4.7, totalReviews: 5432, totalStudents: 32176,
    totalDuration: 40 * 60, totalLessons: 23, price: 94.99, originalPrice: 199.99,
    isFree: false, status: 'published', featured: false, bestseller: false, certificate: true,
    createdAt: '2023-09-10', updatedAt: '2024-07-20', publishedAt: '2023-10-01',
  },
  {
    id: 'course-7',
    title: 'Cloud Computing with AWS – Complete Guide',
    slug: 'cloud-computing-aws',
    shortDescription: 'Master Amazon Web Services. Prepare for AWS Solutions Architect certification and build cloud apps.',
    description: `A comprehensive AWS course covering core services, architecture best practices, security, and certification prep. You'll design and deploy scalable cloud architectures using EC2, S3, RDS, Lambda, and more.`,
    instructorId: 'inst-5', instructorName: 'Priya Sharma',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
    category: 'Cloud Computing', categoryId: 'cat-5',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80',
    previewVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    difficulty: 'Intermediate', language: 'English',
    tags: ['aws', 'cloud', 'devops', 'terraform', 'serverless'],
    whatYouLearn: [
      'AWS core services (EC2, S3, RDS, VPC)', 'Lambda and serverless architecture',
      'Infrastructure as Code with CloudFormation', 'Security and IAM best practices',
      'Cost optimization strategies', 'AWS Solutions Architect exam preparation',
    ],
    requirements: ['Basic IT knowledge', 'AWS free tier account', 'Understanding of web concepts'],
    sections: [
      makeSection(7, 1, 'AWS Core Services', 6),
      makeSection(7, 2, 'Compute & Storage', 5),
      makeSection(7, 3, 'Networking & Security', 5),
      makeSection(7, 4, 'Serverless & Advanced', 4),
      makeSection(7, 5, 'Exam Preparation', 3),
    ],
    quiz: makeQuiz('course-7'),
    reviews: makeReviews('course-7'),
    rating: 4.8, totalReviews: 7654, totalStudents: 46891,
    totalDuration: 35 * 60, totalLessons: 23, price: 84.99, originalPrice: 189.99,
    isFree: false, status: 'published', featured: false, bestseller: true, certificate: true,
    createdAt: '2023-11-01', updatedAt: '2024-08-15', publishedAt: '2023-11-15',
  },
  {
    id: 'course-8',
    title: 'UI/UX Design Fundamentals & Figma Mastery',
    slug: 'ui-ux-design-fundamentals',
    shortDescription: 'Learn professional UI/UX design from scratch. Master Figma, design thinking, and build a portfolio.',
    description: `Learn UI/UX design from the ground up. This course covers design thinking, user research, information architecture, wireframing, prototyping, and visual design. You'll master Figma and build a professional portfolio by the end.`,
    instructorId: 'inst-6', instructorName: 'Alex Thompson',
    instructorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    category: 'UI/UX Design', categoryId: 'cat-6',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    previewVideo: 'https://www.w3schools.com/html/mov_bbb.mp4',
    difficulty: 'Beginner', language: 'English',
    tags: ['ui design', 'ux design', 'figma', 'prototyping', 'design thinking'],
    whatYouLearn: [
      'Design thinking and user research methods', 'Information architecture and wireframing',
      'Visual design principles and typography', 'Figma for professional UI design',
      'Interactive prototyping and user testing', 'Building a compelling design portfolio',
    ],
    requirements: ['No design experience required', 'A computer (Mac or PC)', 'Creative mindset'],
    sections: [
      makeSection(8, 1, 'Design Thinking & UX Research', 5),
      makeSection(8, 2, 'Wireframing & Information Architecture', 5),
      makeSection(8, 3, 'Visual Design Principles', 5),
      makeSection(8, 4, 'Figma Mastery', 6),
      makeSection(8, 5, 'Portfolio & Career', 3),
    ],
    quiz: makeQuiz('course-8'),
    reviews: makeReviews('course-8'),
    rating: 4.9, totalReviews: 11234, totalStudents: 72456,
    totalDuration: 32 * 60, totalLessons: 24, price: 74.99, originalPrice: 164.99,
    isFree: false, status: 'published', featured: true, bestseller: true, certificate: true,
    createdAt: '2024-01-15', updatedAt: '2024-09-01', publishedAt: '2024-02-01',
  },
];

// ─── Enrollments ────────────────────────────────────────────────────────────
export const mockEnrollments: Enrollment[] = [
  {
    id: 'enroll-1', userId: 'student-1', courseId: 'course-1',
    enrolledAt: '2023-07-01', completedAt: '2023-09-15', progress: 100,
    lastAccessedAt: '2023-09-15', quizScore: 88, quizAttempts: 1,
    lessonProgress: [
      { lessonId: 'lesson-s11-1', completed: true, watchedSeconds: 480, completedAt: '2023-07-02' },
      { lessonId: 'lesson-s11-2', completed: true, watchedSeconds: 660, completedAt: '2023-07-03' },
      { lessonId: 'lesson-s11-3', completed: true, watchedSeconds: 540, completedAt: '2023-07-05' },
    ],
  },
  {
    id: 'enroll-2', userId: 'student-1', courseId: 'course-2',
    enrolledAt: '2023-10-01', progress: 62,
    lastAccessedAt: '2024-01-15', quizAttempts: 0,
    currentLessonId: 'lesson-s21-3',
    lessonProgress: [
      { lessonId: 'lesson-s21-1', completed: true, watchedSeconds: 600 },
      { lessonId: 'lesson-s21-2', completed: true, watchedSeconds: 720 },
      { lessonId: 'lesson-s21-3', completed: false, watchedSeconds: 180 },
    ],
  },
  {
    id: 'enroll-3', userId: 'student-1', courseId: 'course-3',
    enrolledAt: '2024-01-20', progress: 35,
    lastAccessedAt: '2024-02-01', quizAttempts: 0,
    lessonProgress: [],
  },
];

// ─── Certificates ────────────────────────────────────────────────────────────
export const mockCertificates: Certificate[] = [
  {
    id: 'cert-1', userId: 'student-1', courseId: 'course-1',
    courseName: 'Complete Python Bootcamp: From Zero to Hero',
    instructorName: 'Dr. Sarah Mitchell',
    issuedAt: '2023-09-15',
    certificateNumber: 'LS-A8K3P2QZ',
    grade: 'Distinction',
  },
  {
    id: 'cert-2', userId: 'student-3', courseId: 'course-5',
    courseName: 'React Masterclass: Build Modern Web Apps',
    instructorName: 'Marcus Johnson',
    issuedAt: '2024-03-20',
    certificateNumber: 'LS-X7R4M1BN',
    grade: 'Merit',
  },
];

// ─── Notifications ────────────────────────────────────────────────────────────
export const mockNotifications: Notification[] = [
  { id: 'notif-1', userId: 'student-1', type: 'certificate', title: 'Certificate Earned!', message: 'Congratulations! You\'ve completed Python Bootcamp and earned your certificate.', read: false, createdAt: '2023-09-15', link: '/certificates' },
  { id: 'notif-2', userId: 'student-1', type: 'announcement', title: 'New Content Added', message: 'Marcus Johnson added 3 new lessons to Full Stack Web Development.', read: false, createdAt: '2024-01-20', link: '/courses/course-2' },
  { id: 'notif-3', userId: 'student-1', type: 'enrollment', title: 'Enrollment Confirmed', message: 'You\'re now enrolled in Data Science with Python & Pandas!', read: true, createdAt: '2024-01-20' },
  { id: 'notif-4', userId: 'student-1', type: 'quiz', title: 'Quiz Available', message: 'A new quiz is available for your Python Bootcamp course.', read: true, createdAt: '2023-08-01' },
];

// ─── Enrollment Trends (for charts) ──────────────────────────────────────────
export const mockEnrollmentTrends: EnrollmentTrend[] = [
  { month: 'Jan', enrollments: 1240, completions: 342, revenue: 89420 },
  { month: 'Feb', enrollments: 1580, completions: 421, revenue: 112840 },
  { month: 'Mar', enrollments: 1920, completions: 518, revenue: 145680 },
  { month: 'Apr', enrollments: 2140, completions: 634, revenue: 163200 },
  { month: 'May', enrollments: 2580, completions: 712, revenue: 198450 },
  { month: 'Jun', enrollments: 2340, completions: 689, revenue: 178920 },
  { month: 'Jul', enrollments: 2860, completions: 823, revenue: 215670 },
  { month: 'Aug', enrollments: 3120, completions: 941, revenue: 238540 },
  { month: 'Sep', enrollments: 3540, completions: 1082, revenue: 274320 },
  { month: 'Oct', enrollments: 3280, completions: 1024, revenue: 251890 },
  { month: 'Nov', enrollments: 3780, completions: 1156, revenue: 289450 },
  { month: 'Dec', enrollments: 4120, completions: 1287, revenue: 318760 },
];

export const mockPlatformStats = {
  totalUsers: 284531,
  totalStudents: 271248,
  totalInstructors: 1283,
  totalCourses: 8421,
  publishedCourses: 7834,
  pendingApprovals: 12,
  totalEnrollments: 934821,
  completionRate: 68.4,
  avgRating: 4.7,
  totalRevenue: 2847320,
};

export const mockAdminStats = {
  totalUsers: 284531,
  totalStudents: 271248,
  totalInstructors: 1283,
  totalCourses: 8421,
  publishedCourses: 7834,
  pendingApprovals: 12,
  totalRevenue: 2847320,
  monthlyRevenue: mockEnrollmentTrends,
};

export const mockInstructorStats = {
  totalRevenue: 48590,
  totalStudents: 4850,
  totalCourses: 4,
  averageRating: 4.9,
  totalReviews: 890,
  monthlyRevenue: mockEnrollmentTrends,
};

export const mockQuizzes = [
  {
    id: 'quiz-1',
    courseId: 'course-1',
    title: 'Full-Stack Web Architecture Assessment',
    description: 'Test your understanding of React 19, TypeScript, and server components.',
    passingScore: 70,
    timeLimit: 15,
    questions: [
      {
        id: 'q-1',
        question: 'Which hook in React is used for managing side effects?',
        options: ['useState', 'useEffect', 'useMemo', 'useContext'],
        correctAnswer: 1,
        points: 20,
      },
      {
        id: 'q-2',
        question: 'What is the main benefit of using TypeScript with React?',
        options: ['Faster runtime execution', 'Static type safety & autocompletion', 'Smaller bundle size', 'Automatic CSS styling'],
        correctAnswer: 1,
        points: 20,
      },
      {
        id: 'q-3',
        question: 'Which HTTP method is idempotent and safe for fetching data?',
        options: ['POST', 'PUT', 'GET', 'DELETE'],
        correctAnswer: 2,
        points: 20,
      },
      {
        id: 'q-4',
        question: 'In Tailwind CSS, which class sets flexbox layout?',
        options: ['block', 'grid', 'flex', 'inline'],
        correctAnswer: 2,
        points: 20,
      },
      {
        id: 'q-5',
        question: 'What does Vite use under the hood for fast dev server HMR?',
        options: ['Webpack', 'ES modules (ESM)', 'Gulp', 'Grunt'],
        correctAnswer: 1,
        points: 20,
      },
    ],
  },
];
