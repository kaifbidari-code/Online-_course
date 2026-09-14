import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserRole, Enrollment, Certificate, Notification } from '../types';
import { mockUsers } from '../data/users';
import { mockEnrollments, mockCertificates, mockNotifications } from '../data/index';

// ─── Toast System ──────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

// ─── App State ─────────────────────────────────────────────────────────────
interface AppState {
  currentUser: User | null;
  isAuthenticated: boolean;
  enrollments: Enrollment[];
  certificates: Certificate[];
  notifications: Notification[];
  wishlist: string[];
  toasts: Toast[];
}

interface AppContextType extends AppState {
  login: (email: string, _password: string, role: UserRole) => boolean;
  logout: () => void;
  enroll: (courseId: string) => void;
  unenroll: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
  getEnrollment: (courseId: string) => Enrollment | undefined;
  updateProgress: (courseId: string, lessonId: string, completed: boolean) => void;
  toggleWishlist: (courseId: string) => void;
  isWishlisted: (courseId: string) => boolean;
  isInWishlist: (courseId: string) => boolean;
  markNotificationRead: (notifId: string) => void;
  markAllRead: () => void;
  addToast: (
    typeOrOptions: ToastType | { type: ToastType; title: string; message?: string },
    title?: string,
    message?: string
  ) => void;
  removeToast: (id: string) => void;
  updateUser: (updates: Partial<User>) => void;
  submitQuiz: (courseId: string, score: number) => void;
  earnCertificate: (courseId: string, courseName: string, instructorName: string) => Certificate;
  unreadNotificationsCount: number;
  unreadCount: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(mockUsers[0]); // default: student
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(mockEnrollments);
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((
    typeOrOptions: ToastType | { type: ToastType; title: string; message?: string },
    title?: string,
    message?: string
  ) => {
    let type: ToastType;
    let tTitle: string;
    let tMessage: string | undefined;

    if (typeof typeOrOptions === 'object') {
      type = typeOrOptions.type;
      tTitle = typeOrOptions.title;
      tMessage = typeOrOptions.message;
    } else {
      type = typeOrOptions;
      tTitle = title || '';
      tMessage = message;
    }

    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, type, title: tTitle, message: tMessage }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const login = useCallback((email: string, _password: string, role: UserRole): boolean => {
    const user = mockUsers.find(u => u.email === email && u.role === role);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      // Update notifications for this user
      setNotifications(mockNotifications.filter(n => n.userId === user.id));
      // Update enrollments for this user
      setEnrollments(mockEnrollments.filter(e => e.userId === user.id));
      setCertificates(mockCertificates.filter(c => c.userId === user.id));
      addToast('success', `Welcome back, ${user.name.split(' ')[0]}!`);
      return true;
    }
    addToast('error', 'Login failed', 'Invalid credentials. Please check email and role.');
    return false;
  }, [addToast]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setEnrollments([]);
    setCertificates([]);
    setNotifications([]);
  }, []);

  const isEnrolled = useCallback((courseId: string): boolean => {
    return enrollments.some(e => e.courseId === courseId && e.userId === currentUser?.id);
  }, [enrollments, currentUser]);

  const getEnrollment = useCallback((courseId: string): Enrollment | undefined => {
    return enrollments.find(e => e.courseId === courseId && e.userId === currentUser?.id);
  }, [enrollments, currentUser]);

  const enroll = useCallback((courseId: string) => {
    if (!currentUser) return;
    if (isEnrolled(courseId)) return;

    const newEnrollment: Enrollment = {
      id: `enroll-${Date.now()}`,
      userId: currentUser.id,
      courseId,
      enrolledAt: new Date().toISOString(),
      lastAccessedAt: new Date().toISOString(),
      progress: 0,
      lessonProgress: [],
      quizAttempts: 0,
    };

    setEnrollments(prev => [...prev, newEnrollment]);
    setCurrentUser(prev => prev ? {
      ...prev,
      enrolledCourses: [...(prev.enrolledCourses || []), courseId],
    } : prev);

    // Add enrollment notification
    const notif: Notification = {
      id: `notif-${Date.now()}`,
      userId: currentUser.id,
      type: 'enrollment',
      title: 'Enrollment successful! 🎉',
      message: 'You have successfully enrolled. Start learning now!',
      read: false,
      createdAt: new Date().toISOString(),
      link: '/my-learning',
    };
    setNotifications(prev => [notif, ...prev]);

    addToast('success', 'Enrolled successfully!', 'Start your learning journey now.');
  }, [currentUser, isEnrolled, addToast]);

  const unenroll = useCallback((courseId: string) => {
    if (!currentUser) return;
    setEnrollments(prev => prev.filter(e => !(e.courseId === courseId && e.userId === currentUser.id)));
    addToast('info', 'Unenrolled from course');
  }, [currentUser, addToast]);

  const updateProgress = useCallback((courseId: string, lessonId: string, completed: boolean) => {
    if (!currentUser) return;
    setEnrollments(prev => prev.map(e => {
      if (e.courseId !== courseId || e.userId !== currentUser.id) return e;

      const existingLP = e.lessonProgress.find(lp => lp.lessonId === lessonId);
      let newLP = [...e.lessonProgress];
      if (existingLP) {
        newLP = newLP.map(lp => lp.lessonId === lessonId
          ? { ...lp, completed, completedAt: completed ? new Date().toISOString() : undefined }
          : lp
        );
      } else {
        newLP = [...newLP, {
          lessonId,
          completed,
          watchedSeconds: 0,
          completedAt: completed ? new Date().toISOString() : undefined,
        }];
      }

      const completedCount = newLP.filter(lp => lp.completed).length;
      const progress = newLP.length > 0 ? Math.round((completedCount / newLP.length) * 100) : 0;

      return {
        ...e,
        lessonProgress: newLP,
        currentLessonId: lessonId,
        lastAccessedAt: new Date().toISOString(),
        progress,
        completedAt: progress === 100 ? new Date().toISOString() : e.completedAt,
      };
    }));
  }, [currentUser]);

  const wishlist = currentUser?.wishlist || [];

  const toggleWishlist = useCallback((courseId: string) => {
    if (!currentUser) return;
    const isIn = currentUser.wishlist?.includes(courseId);
    setCurrentUser(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        wishlist: isIn
          ? (prev.wishlist || []).filter(id => id !== courseId)
          : [...(prev.wishlist || []), courseId],
      };
    });
    addToast('success', isIn ? 'Removed from wishlist' : 'Added to wishlist!');
  }, [currentUser, addToast]);

  const isWishlisted = useCallback((courseId: string): boolean => {
    return (currentUser?.wishlist || []).includes(courseId);
  }, [currentUser]);

  const markNotificationRead = useCallback((notifId: string) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setCurrentUser(prev => prev ? { ...prev, ...updates } : prev);
    addToast('success', 'Profile updated successfully!');
  }, [addToast]);

  const submitQuiz = useCallback((courseId: string, score: number) => {
    if (!currentUser) return;
    setEnrollments(prev => prev.map(e =>
      e.courseId === courseId && e.userId === currentUser.id
        ? { ...e, quizScore: score, quizAttempts: e.quizAttempts + 1 }
        : e
    ));
  }, [currentUser]);

  const earnCertificate = useCallback((courseId: string, courseName: string, instructorName: string): Certificate => {
    const existing = certificates.find(c => c.userId === currentUser?.id && c.courseId === courseId);
    if (existing) return existing;

    const cert: Certificate = {
      id: `cert-${Date.now()}`,
      userId: currentUser?.id || '',
      courseId,
      courseName,
      instructorName,
      issuedAt: new Date().toISOString(),
      certificateNumber: `LS-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      grade: 'Pass',
    };
    setCertificates(prev => [...prev, cert]);

    const notif: Notification = {
      id: `notif-cert-${Date.now()}`,
      userId: currentUser?.id || '',
      type: 'certificate',
      title: '🎓 Certificate Earned!',
      message: `Congratulations! You earned a certificate for ${courseName}`,
      read: false,
      createdAt: new Date().toISOString(),
      link: '/certificates',
    };
    setNotifications(prev => [notif, ...prev]);
    addToast('success', '🎓 Certificate Earned!', `Congratulations on completing ${courseName}!`);
    return cert;
  }, [currentUser, certificates, addToast]);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      currentUser,
      isAuthenticated,
      enrollments,
      certificates,
      notifications,
      wishlist,
      toasts,
      login,
      logout,
      enroll,
      unenroll,
      isEnrolled,
      getEnrollment,
      updateProgress,
      toggleWishlist,
      isWishlisted,
      isInWishlist: isWishlisted,
      markNotificationRead,
      markAllRead,
      addToast,
      removeToast,
      updateUser,
      submitQuiz,
      earnCertificate,
      unreadNotificationsCount,
      unreadCount: unreadNotificationsCount,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
