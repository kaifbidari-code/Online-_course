import { MessageSquare } from 'lucide-react';
import { mockUsers } from '../../data/users';
import { Avatar } from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';

export function InstructorStudentsPage() {
  const students = mockUsers.filter(u => u.role === 'student');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-text-primary">Enrolled Students</h1>
        <p className="text-sm text-text-secondary">View and message active learners across your courses.</p>
      </div>

      <div className="card p-6 bg-white shadow-soft space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-text-secondary">
            <thead className="bg-surface-50 text-text-muted font-bold uppercase tracking-wider border-b border-surface-200">
              <tr>
                <th className="p-3">Student</th>
                <th className="p-3">Email</th>
                <th className="p-3">Location</th>
                <th className="p-3">Enrolled Courses</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 font-medium">
              {students.map(s => (
                <tr key={s.id} className="hover:bg-surface-50">
                  <td className="p-3 font-bold text-text-primary flex items-center gap-3">
                    <Avatar src={s.avatar} name={s.name} size="sm" />
                    <span>{s.name}</span>
                  </td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.location || 'United States'}</td>
                  <td className="p-3"><Badge variant="primary" size="sm">{s.enrolledCourses?.length || 2} Courses</Badge></td>
                  <td className="p-3 text-right">
                    <button className="p-1.5 text-text-muted hover:text-primary-600">
                      <MessageSquare size={16} />
                    </button>
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
