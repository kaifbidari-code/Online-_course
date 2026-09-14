import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PlayCircle, Award } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { mockCourses } from '../../data/courses';
import { ProgressBar } from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export function MyLearningPage() {
  const { enrollments } = useApp();
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

  const enrolledCourseIds = enrollments.map(e => e.courseId);
  const enrolledCourses = mockCourses.filter(c => enrolledCourseIds.includes(c.id));

  const filtered = enrolledCourses.filter(c => {
    const e = enrollments.find(item => item.courseId === c.id);
    if (filter === 'in-progress') return (e?.progress || 0) < 100;
    if (filter === 'completed') return (e?.progress || 0) === 100;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-text-primary">My Learning</h1>
        <p className="text-sm text-text-secondary">Track your progress, continue watching lessons, and download earned certificates.</p>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-surface-200 flex gap-6 text-sm font-bold">
        {(['all', 'in-progress', 'completed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`py-3 capitalize border-b-2 transition-all ${
              filter === tab
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.replace('-', ' ')} ({
              tab === 'all' ? enrolledCourses.length :
              tab === 'in-progress' ? enrollments.filter(e => e.progress < 100).length :
              enrollments.filter(e => e.progress === 100).length
            })
          </button>
        ))}
      </div>

      {/* Course List */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center space-y-4">
          <BookOpen size={40} className="mx-auto text-text-muted" />
          <h3 className="text-lg font-bold text-text-primary">No courses in this tab</h3>
          <p className="text-xs text-text-secondary max-w-sm mx-auto">
            Browse through our catalog to enroll in courses and build your skills.
          </p>
          <Link to="/explore">
            <Button size="sm">Explore Courses</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(course => {
            const e = enrollments.find(item => item.courseId === course.id);
            const progress = e?.progress || 0;
            const isDone = progress === 100;

            return (
              <div key={course.id} className="card p-4 space-y-4 hover:shadow-card transition-shadow">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-100">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  {isDone && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="success" size="sm">✓ Completed</Badge>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Badge variant="primary" size="sm">{course.category}</Badge>
                  <h3 className="font-bold text-base text-text-primary line-clamp-1">{course.title}</h3>
                  <p className="text-xs text-text-secondary font-medium">By {course.instructorName}</p>

                  <ProgressBar value={progress} size="sm" showLabel />

                  <div className="pt-2 flex items-center justify-between">
                    <Link to={`/learn/${course.id}`}>
                      <Button size="sm" rightIcon={<PlayCircle size={14} />}>
                        {isDone ? 'Review' : 'Continue'}
                      </Button>
                    </Link>

                    {isDone && (
                      <Link to="/certificates">
                        <Button size="sm" variant="secondary" leftIcon={<Award size={14} />}>
                          Certificate
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
