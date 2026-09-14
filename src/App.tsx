import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AuthGuard } from './components/guards/AuthGuard';
import { RoleGuard } from './components/guards/RoleGuard';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { ExploreCourses } from './pages/student/ExploreCourses';
import { CourseDetailsPage } from './pages/student/CourseDetailsPage';
import { CoursePlayerPage } from './pages/student/CoursePlayerPage';
import { MyLearningPage } from './pages/student/MyLearningPage';
import { WishlistPage } from './pages/student/WishlistPage';
import { QuizPage } from './pages/student/QuizPage';
import { QuizResultPage } from './pages/student/QuizResultPage';
import { CertificatesPage } from './pages/student/CertificatesPage';
import { StudentProfilePage } from './pages/student/StudentProfilePage';

// Instructor Pages
import { InstructorDashboard } from './pages/instructor/InstructorDashboard';
import { InstructorCourses } from './pages/instructor/InstructorCourses';
import { CreateCoursePage } from './pages/instructor/CreateCoursePage';
import { InstructorStudentsPage } from './pages/instructor/InstructorStudentsPage';
import { InstructorAnalyticsPage } from './pages/instructor/InstructorAnalyticsPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { CourseManagementPage } from './pages/admin/CourseManagementPage';
import { CategoryManagementPage } from './pages/admin/CategoryManagementPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export default function App() {
  return (
    <Routes>
      {/* LMS Fullscreen Player Route without standard header/footer */}
      <Route
        path="/learn/:id"
        element={
          <AuthGuard>
            <CoursePlayerPage />
          </AuthGuard>
        }
      />

      {/* Main Site Layout */}
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/explore" element={<ExploreCourses />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />

        {/* Protected Student Routes */}
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <StudentDashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/my-learning"
          element={
            <AuthGuard>
              <MyLearningPage />
            </AuthGuard>
          }
        />
        <Route
          path="/wishlist"
          element={
            <AuthGuard>
              <WishlistPage />
            </AuthGuard>
          }
        />
        <Route
          path="/certificates"
          element={
            <AuthGuard>
              <CertificatesPage />
            </AuthGuard>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <StudentProfilePage />
            </AuthGuard>
          }
        />
        <Route
          path="/settings"
          element={
            <AuthGuard>
              <StudentProfilePage />
            </AuthGuard>
          }
        />
        <Route
          path="/quiz/:id"
          element={
            <AuthGuard>
              <QuizPage />
            </AuthGuard>
          }
        />
        <Route
          path="/quiz-result/:id"
          element={
            <AuthGuard>
              <QuizResultPage />
            </AuthGuard>
          }
        />

        {/* Protected Instructor Routes */}
        <Route
          path="/instructor/dashboard"
          element={
            <RoleGuard allowedRoles={['instructor']}>
              <InstructorDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="/instructor/courses"
          element={
            <RoleGuard allowedRoles={['instructor']}>
              <InstructorCourses />
            </RoleGuard>
          }
        />
        <Route
          path="/instructor/create"
          element={
            <RoleGuard allowedRoles={['instructor']}>
              <CreateCoursePage />
            </RoleGuard>
          }
        />
        <Route
          path="/instructor/students"
          element={
            <RoleGuard allowedRoles={['instructor']}>
              <InstructorStudentsPage />
            </RoleGuard>
          }
        />
        <Route
          path="/instructor/analytics"
          element={
            <RoleGuard allowedRoles={['instructor']}>
              <InstructorAnalyticsPage />
            </RoleGuard>
          }
        />
        <Route
          path="/instructor/profile"
          element={
            <RoleGuard allowedRoles={['instructor']}>
              <StudentProfilePage />
            </RoleGuard>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <RoleGuard allowedRoles={['admin']}>
              <AdminDashboard />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RoleGuard allowedRoles={['admin']}>
              <UserManagementPage />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <RoleGuard allowedRoles={['admin']}>
              <CourseManagementPage />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <RoleGuard allowedRoles={['admin']}>
              <CategoryManagementPage />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <RoleGuard allowedRoles={['admin']}>
              <AdminReportsPage />
            </RoleGuard>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <RoleGuard allowedRoles={['admin']}>
              <AdminSettingsPage />
            </RoleGuard>
          }
        />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
