import { Link } from 'react-router-dom';
import {
  DollarSign, Users, BookOpen, Star, PlusCircle,
  ArrowUpRight, Eye
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { mockInstructorStats, mockCourses } from '../../data/mockData';
import { formatPrice, formatNumber } from '../../utils/formatters';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export function InstructorDashboard() {
  const stats = mockInstructorStats;
  const instructorCourses = mockCourses.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary">Instructor Workspace</h1>
          <p className="text-sm text-text-secondary">Track course performance, student engagement, and revenue.</p>
        </div>
        <Link to="/instructor/create">
          <Button leftIcon={<PlusCircle size={18} />}>Create New Course</Button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-5 space-y-2">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-semibold">Total Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-success-100 text-success-600 flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-text-primary">{formatPrice(stats.totalRevenue)}</p>
          <span className="text-xs text-success-600 font-bold flex items-center gap-1">
            <ArrowUpRight size={14} /> +18.4% this month
          </span>
        </div>

        <div className="card p-5 space-y-2">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-semibold">Total Students</span>
            <div className="w-8 h-8 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-text-primary">{formatNumber(stats.totalStudents)}</p>
          <span className="text-xs text-primary-600 font-bold flex items-center gap-1">
            <ArrowUpRight size={14} /> +120 new enrollments
          </span>
        </div>

        <div className="card p-5 space-y-2">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-semibold">Published Courses</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <BookOpen size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-text-primary">{stats.totalCourses}</p>
          <span className="text-xs text-text-muted">All active & published</span>
        </div>

        <div className="card p-5 space-y-2">
          <div className="flex justify-between items-center text-text-muted">
            <span className="text-xs font-semibold">Average Rating</span>
            <div className="w-8 h-8 rounded-xl bg-warning-100 text-warning-600 flex items-center justify-center">
              <Star size={16} />
            </div>
          </div>
          <p className="text-2xl font-black text-text-primary">{stats.averageRating.toFixed(1)} ⭐</p>
          <span className="text-xs text-text-muted">From {formatNumber(stats.totalReviews)} reviews</span>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="card p-6 space-y-4 bg-white shadow-soft">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-text-primary">Revenue Trend (2026)</h3>
            <p className="text-xs text-text-muted">Monthly earnings overview</p>
          </div>
          <Badge variant="success">+18% YoY</Badge>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.monthlyRevenue}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" tickFormatter={v => `$${v}`} />
              <Tooltip formatter={(val: any) => [`$${Number(val || 0).toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Courses Table */}
      <div className="card p-6 space-y-4 bg-white shadow-soft">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-text-primary">Your Courses</h3>
          <Link to="/instructor/courses" className="text-xs text-primary-600 font-bold hover:underline">
            View All ({stats.totalCourses}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-text-secondary">
            <thead className="bg-surface-50 text-text-muted font-bold uppercase tracking-wider border-b border-surface-200">
              <tr>
                <th className="p-3">Course</th>
                <th className="p-3">Price</th>
                <th className="p-3">Students</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 font-medium">
              {instructorCourses.map(c => (
                <tr key={c.id} className="hover:bg-surface-50">
                  <td className="p-3 font-bold text-text-primary flex items-center gap-3">
                    <img src={c.thumbnail} alt={c.title} className="w-10 h-8 object-cover rounded-md" />
                    <span className="line-clamp-1 max-w-xs">{c.title}</span>
                  </td>
                  <td className="p-3">{formatPrice(c.price)}</td>
                  <td className="p-3">{formatNumber(c.totalStudents)}</td>
                  <td className="p-3">⭐ {c.rating.toFixed(1)}</td>
                  <td className="p-3"><Badge variant="success" size="sm">Published</Badge></td>
                  <td className="p-3 text-right space-x-2">
                    <Link to={`/courses/${c.id}`} className="p-1 text-text-muted hover:text-primary-600 inline-block">
                      <Eye size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
