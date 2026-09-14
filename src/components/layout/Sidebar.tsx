import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, PlusCircle, Users, BarChart2,
  Globe, Shield, Settings, ChevronRight
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import Badge from '../ui/Badge';

interface SidebarItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
}

const instructorItems: SidebarItem[] = [
  { to: '/instructor/dashboard', label: 'Overview', icon: <LayoutDashboard size={18} /> },
  { to: '/instructor/courses', label: 'My Courses', icon: <BookOpen size={18} /> },
  { to: '/instructor/create', label: 'Create Course', icon: <PlusCircle size={18} /> },
  { to: '/instructor/students', label: 'Students', icon: <Users size={18} /> },
  { to: '/instructor/analytics', label: 'Analytics', icon: <BarChart2 size={18} /> },
];

const adminItems: SidebarItem[] = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { to: '/admin/users', label: 'User Management', icon: <Users size={18} /> },
  { to: '/admin/courses', label: 'Course Approvals', icon: <BookOpen size={18} />, badge: '3' },
  { to: '/admin/categories', label: 'Categories', icon: <Globe size={18} /> },
  { to: '/admin/reports', label: 'Analytics & Reports', icon: <BarChart2 size={18} /> },
  { to: '/admin/settings', label: 'Platform Settings', icon: <Settings size={18} /> },
];

export function Sidebar() {
  const { user, role } = useAuth();
  const location = useLocation();

  const items = role === 'admin' ? adminItems : instructorItems;
  const isPathActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-white border-r border-surface-200 shrink-0 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between hidden md:flex">
      <div>
        {/* User Card */}
        {user && (
          <div className="p-3 mb-6 bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl border border-primary-100 flex items-center gap-3">
            <Avatar src={user.avatar} name={user.name} size="md" />
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm text-text-primary truncate">{user.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Badge variant={role === 'admin' ? 'purple' : 'primary'} size="sm" className="capitalize">
                  {role}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Section Heading */}
        <p className="text-[11px] font-bold uppercase tracking-wider text-text-muted px-3 mb-3">
          {role === 'admin' ? 'Administration' : 'Instructor Workspace'}
        </p>

        {/* Navigation Items */}
        <nav className="space-y-1" aria-label="Sidebar navigation">
          {items.map(item => {
            const active = isPathActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150',
                  active
                    ? 'bg-primary-600 text-white shadow-primary font-semibold'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-100'
                )}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className={cn(
                    'px-2 py-0.5 text-xs font-bold rounded-full',
                    active ? 'bg-white/20 text-white' : 'bg-primary-100 text-primary-700'
                  )}>
                    {item.badge}
                  </span>
                ) : active && (
                  <ChevronRight size={14} className="opacity-80" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer info */}
      <div className="pt-4 border-t border-surface-100">
        <div className="p-3 bg-surface-50 rounded-xl flex items-center gap-2 text-xs text-text-muted">
          <Shield size={14} className="text-success-600 shrink-0" />
          <span>System Online • v2.4</span>
        </div>
      </div>
    </aside>
  );
}
