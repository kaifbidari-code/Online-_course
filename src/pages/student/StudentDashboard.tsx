import { Link } from 'react-router-dom';
import {
  BookOpen, Award, Clock, Flame, PlayCircle, ChevronRight,
  TrendingUp, CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { mockCourses } from '../../data/courses';
import { CourseCard } from '../../components/course/CourseCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import Button from '../../components/ui/Button';

export function StudentDashboard() {
  const { user } = useAuth();
  const { enrollments, certificates } = useApp();

  const enrolledCourseIds = enrollments.map(e => e.courseId);
  const enrolledCourses = mockCourses.filter(c => enrolledCourseIds.includes(c.id));
  const recommendedCourses = mockCourses.filter(c => !enrolledCourseIds.includes(c.id)).slice(0, 3);

  const completedCount = enrollments.filter(e => e.progress === 100).length;
  const avgProgress = enrollments.length > 0
    ? Math.round(enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length)
    : 0;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="card p-6 sm:p-8 bg-gradient-to-r from-primary-600 via-purple-600 to-indigo-700 text-white rounded-3xl relative overflow-hidden shadow-elevated">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md">
            <Flame size={14} className="text-warning-400" />
            <span>3-Day Learning Streak 🔥</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name.split(' ')[0] || 'Learner'}! 👋
          </h1>
          <p className="text-primary-100 text-xs sm:text-sm leading-relaxed">
            You're making great progress! Keep up the streak and complete your active courses to earn verifiable certificates.
          </p>
          <div className="pt-2 flex gap-3">
            <Link to="/explore">
              <Button size="sm" className="bg-white text-primary-700 hover:bg-surface-100">
                Explore New Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5 space-y-2">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-semibold">Enrolled Courses</span>
            <div className="w-8 h-8 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
              <BookOpen size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-text-primary">{enrollments.length}</p>
          <p className="text-[11px] text-text-muted">Active learning paths</p>
        </div>

        <div className="card p-5 space-y-2">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-semibold">Average Completion</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-text-primary">{avgProgress}%</p>
          <ProgressBar value={avgProgress} size="sm" color="primary" />
        </div>

        <div className="card p-5 space-y-2">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-semibold">Completed Courses</span>
            <div className="w-8 h-8 rounded-xl bg-success-100 text-success-600 flex items-center justify-center">
              <CheckCircle size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-text-primary">{completedCount}</p>
          <p className="text-[11px] text-success-600 font-semibold">+1 finished this month</p>
        </div>

        <div className="card p-5 space-y-2">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-semibold">Earned Certificates</span>
            <div className="w-8 h-8 rounded-xl bg-warning-100 text-warning-600 flex items-center justify-center">
              <Award size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-text-primary">{certificates.length}</p>
          <Link to="/certificates" className="text-[11px] text-primary-600 font-semibold hover:underline">
            View & Share →
          </Link>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-text-primary">Continue Learning</h2>
          <Link to="/my-learning" className="text-xs text-primary-600 font-bold hover:underline flex items-center gap-1">
            View My Learning <ChevronRight size={14} />
          </Link>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="card p-8 text-center space-y-4">
            <BookOpen size={36} className="mx-auto text-text-muted" />
            <p className="font-bold text-text-primary">No enrolled courses yet</p>
            <p className="text-xs text-text-secondary max-w-sm mx-auto">
              Browse our course catalog and enroll in top courses to jumpstart your career!
            </p>
            <Link to="/explore">
              <Button size="sm">Explore Catalog</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledCourses.map(course => {
              const enrollment = enrollments.find(e => e.courseId === course.id);
              const progress = enrollment?.progress || 0;

              return (
                <div key={course.id} className="card p-4 flex gap-4 items-center hover:shadow-card transition-shadow">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-24 h-20 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-2">
                    <p className="text-[10px] text-primary-600 font-bold uppercase">{course.category}</p>
                    <h3 className="font-bold text-sm text-text-primary line-clamp-1">{course.title}</h3>
                    <ProgressBar value={progress} size="sm" showLabel />
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[11px] text-text-muted flex items-center gap-1">
                        <Clock size={11} /> {course.totalLessons} lessons
                      </span>
                      <Link to={`/learn/${course.id}`}>
                        <Button size="sm" rightIcon={<PlayCircle size={14} />}>
                          {progress === 0 ? 'Start' : 'Continue'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recommended Courses */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-extrabold text-text-primary">Recommended For You</h2>
            <p className="text-xs text-text-secondary">Based on your interests in Web Development & AI</p>
          </div>
          <Link to="/explore" className="text-xs text-primary-600 font-bold hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
