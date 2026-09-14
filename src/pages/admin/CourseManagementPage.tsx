import { mockCourses } from '../../data/courses';
import { formatPrice } from '../../utils/formatters';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export function CourseManagementPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-text-primary">Course Moderation & Approvals</h1>
        <p className="text-sm text-text-secondary">Approve submitted courses, manage status, and feature top content.</p>
      </div>

      <div className="card p-6 bg-white shadow-soft space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-text-secondary">
            <thead className="bg-surface-50 text-text-muted font-bold uppercase tracking-wider border-b border-surface-200">
              <tr>
                <th className="p-3">Course</th>
                <th className="p-3">Instructor</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
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
                  <td className="p-3">{c.instructorName}</td>
                  <td className="p-3"><Badge variant="primary" size="sm">{c.category}</Badge></td>
                  <td className="p-3 font-bold">{formatPrice(c.price)}</td>
                  <td className="p-3"><Badge variant="success" size="sm">Published</Badge></td>
                  <td className="p-3 text-right space-x-2">
                    <Button size="sm" variant="outline">Unpublish</Button>
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
