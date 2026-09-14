import { Link } from 'react-router-dom';
import { PlusCircle, Eye } from 'lucide-react';
import { mockCourses } from '../../data/courses';
import { formatPrice, formatNumber } from '../../utils/formatters';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export function InstructorCourses() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary">My Published Courses</h1>
          <p className="text-sm text-text-secondary">Manage curriculum, edit pricing, and view analytics.</p>
        </div>
        <Link to="/instructor/create">
          <Button leftIcon={<PlusCircle size={18} />}>Create New Course</Button>
        </Link>
      </div>

      <div className="card p-6 bg-white shadow-soft space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-text-secondary">
            <thead className="bg-surface-50 text-text-muted font-bold uppercase tracking-wider border-b border-surface-200">
              <tr>
                <th className="p-3">Course</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Enrolled</th>
                <th className="p-3">Rating</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 font-medium">
              {mockCourses.map(c => (
                <tr key={c.id} className="hover:bg-surface-50">
                  <td className="p-3 font-bold text-text-primary flex items-center gap-3">
                    <img src={c.thumbnail} alt={c.title} className="w-12 h-9 object-cover rounded-lg" />
                    <span className="line-clamp-1 max-w-xs">{c.title}</span>
                  </td>
                  <td className="p-3"><Badge variant="primary" size="sm">{c.category}</Badge></td>
                  <td className="p-3 font-bold">{formatPrice(c.price)}</td>
                  <td className="p-3">{formatNumber(c.totalStudents)}</td>
                  <td className="p-3">⭐ {c.rating.toFixed(1)}</td>
                  <td className="p-3 text-right space-x-2">
                    <Link to={`/courses/${c.id}`} className="p-1.5 text-text-muted hover:text-primary-600 inline-block">
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
