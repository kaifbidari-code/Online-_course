import { useState } from 'react';
import { Search } from 'lucide-react';
import { mockUsers } from '../../data/users';
import { Avatar } from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export function UserManagementPage() {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [users, setUsers] = useState(mockUsers);

  const filtered = users.filter(u => {
    if (query && !u.name.toLowerCase().includes(query.toLowerCase()) && !u.email.toLowerCase().includes(query.toLowerCase())) return false;
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    return true;
  });

  const toggleStatus = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, isActive: !u.isActive } : u));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-text-primary">User Management</h1>
          <p className="text-sm text-text-secondary">Manage platform accounts, role permissions, and access status.</p>
        </div>
      </div>

      <div className="card p-6 bg-white shadow-soft space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-3 text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full bg-surface-50 border border-surface-200 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            className="bg-surface-50 border border-surface-200 rounded-xl px-3 py-2 text-sm font-semibold focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-text-secondary">
            <thead className="bg-surface-50 text-text-muted font-bold uppercase tracking-wider border-b border-surface-200">
              <tr>
                <th className="p-3">User</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Joined</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 font-medium">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-surface-50">
                  <td className="p-3 font-bold text-text-primary flex items-center gap-3">
                    <Avatar src={u.avatar} name={u.name} size="sm" />
                    <div>
                      <p className="line-clamp-1">{u.name}</p>
                      <p className="text-[10px] text-text-muted font-normal">{u.email}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge variant={u.role === 'admin' ? 'purple' : u.role === 'instructor' ? 'primary' : 'gray'} size="sm" className="capitalize">
                      {u.role}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Badge variant={u.isActive ? 'success' : 'error'} size="sm">
                      {u.isActive ? 'Active' : 'Suspended'}
                    </Badge>
                  </td>
                  <td className="p-3">{u.joinedAt || '2026-01-15'}</td>
                  <td className="p-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleStatus(u.id)}
                      className={u.isActive ? 'text-error-600 hover:bg-error-50' : 'text-success-600 hover:bg-success-50'}
                    >
                      {u.isActive ? 'Suspend' : 'Activate'}
                    </Button>
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
