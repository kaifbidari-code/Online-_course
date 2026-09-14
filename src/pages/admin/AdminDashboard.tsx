import { Link } from 'react-router-dom';
import {
  Users, BookOpen, DollarSign, CheckCircle, Clock
} from 'lucide-react';
import { mockAdminStats, mockCourses } from '../../data/mockData';
import { formatPrice, formatNumber } from '../../utils/formatters';
import Button from '../../components/ui/Button';

export function AdminDashboard() {
  const stats = mockAdminStats;
  const pendingCourses = mockCourses.slice(0, 2);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-text-primary">Admin Control Center</h1>
        <p className="text-sm text-text-secondary">Platform health, pending approvals, user stats & gross volume.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5 space-y-2">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-semibold">Gross Volume</span>
            <div className="w-8 h-8 rounded-xl bg-success-100 text-success-600 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-text-primary">{formatPrice(stats.totalRevenue)}</p>
          <span className="text-xs text-success-600 font-bold">+24.5% platform growth</span>
        </div>

        <div className="card p-5 space-y-2">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-semibold">Total Users</span>
            <div className="w-8 h-8 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-text-primary">{formatNumber(stats.totalUsers)}</p>
          <span className="text-xs text-text-muted">{stats.totalStudents} students • {stats.totalInstructors} instructors</span>
        </div>

        <div className="card p-5 space-y-2">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-semibold">Total Courses</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <BookOpen size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-text-primary">{stats.totalCourses}</p>
          <span className="text-xs text-warning-600 font-bold">{stats.pendingApprovals} pending review</span>
        </div>

        <div className="card p-5 space-y-2">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-semibold">System Health</span>
            <div className="w-8 h-8 rounded-xl bg-success-100 text-success-600 flex items-center justify-center">
              <CheckCircle size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-text-primary">99.9%</p>
          <span className="text-xs text-success-600 font-bold">All services operational</span>
        </div>
      </div>

      {/* Pending Course Approvals Queue */}
      <div className="card p-6 space-y-4 bg-white shadow-soft">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Clock size={18} className="text-warning-500" /> Pending Course Submissions
            </h3>
            <p className="text-xs text-text-muted">Require administrator review before publishing</p>
          </div>
          <Link to="/admin/courses">
            <Button size="sm" variant="secondary">View Approvals Queue</Button>
          </Link>
        </div>

        <div className="space-y-3">
          {pendingCourses.map(course => (
            <div key={course.id} className="p-4 rounded-xl border border-surface-200 bg-surface-50 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={course.thumbnail} alt={course.title} className="w-16 h-10 object-cover rounded-lg" />
                <div>
                  <h4 className="font-bold text-sm text-text-primary">{course.title}</h4>
                  <p className="text-xs text-text-muted">By {course.instructorName} • {course.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-success-600 hover:bg-success-700 text-white">Approve</Button>
                <Button size="sm" variant="outline" className="text-error-600 hover:bg-error-50">Reject</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
