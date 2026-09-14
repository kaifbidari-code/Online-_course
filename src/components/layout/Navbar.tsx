import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, Bell, ChevronDown, Menu, X, BookOpen, LayoutDashboard,
  GraduationCap, Heart, Award, Users, BarChart2, Settings,
  LogOut, User, PlusCircle, Globe
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui/Avatar';
import Badge from '../ui/Badge';
import { cn } from '../../utils/cn';
import type { UserRole } from '../../types';

interface NavLink { to: string; label: string; icon: React.ReactNode; }

const studentNav: NavLink[] = [
  { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { to: '/explore', label: 'Explore', icon: <Globe size={16} /> },
  { to: '/my-learning', label: 'My Learning', icon: <BookOpen size={16} /> },
  { to: '/wishlist', label: 'Wishlist', icon: <Heart size={16} /> },
  { to: '/certificates', label: 'Certificates', icon: <Award size={16} /> },
];

const instructorNav: NavLink[] = [
  { to: '/instructor/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { to: '/instructor/courses', label: 'My Courses', icon: <BookOpen size={16} /> },
  { to: '/instructor/create', label: 'Create Course', icon: <PlusCircle size={16} /> },
  { to: '/instructor/students', label: 'Students', icon: <Users size={16} /> },
  { to: '/instructor/analytics', label: 'Analytics', icon: <BarChart2 size={16} /> },
];

const adminNav: NavLink[] = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { to: '/admin/users', label: 'Users', icon: <Users size={16} /> },
  { to: '/admin/courses', label: 'Courses', icon: <BookOpen size={16} /> },
  { to: '/admin/categories', label: 'Categories', icon: <Globe size={16} /> },
  { to: '/admin/reports', label: 'Reports', icon: <BarChart2 size={16} /> },
];

const navByRole: Record<UserRole, NavLink[]> = { student: studentNav, instructor: instructorNav, admin: adminNav };

export function Navbar() {
  const { user, role, isAuthenticated, logout, switchRole } = useAuth();
  const { notifications, unreadCount, markAllRead } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const links = role ? navByRole[role] : [];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-surface-200" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="LearnSphere Home">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className="font-bold text-text-primary text-lg hidden sm:block">
            Learn<span className="gradient-text">Sphere</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        {isAuthenticated && (
          <nav className="hidden lg:flex items-center gap-1 ml-2" aria-label="Main navigation">
            {links.map(link => (
              <Link key={link.to} to={link.to}
                className={cn('nav-link', isActive(link.to) && 'nav-link-active')}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
          <Search size={16} className="absolute left-3 text-text-muted" />
          <input
            type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search courses…"
            className="pl-9 pr-4 py-2 text-sm bg-surface-100 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all w-48 lg:w-64"
            aria-label="Search courses"
          />
        </form>

        {isAuthenticated && user ? (
          <>
            {/* Notifications */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => { setNotifOpen(o => !o); if (!notifOpen) markAllRead(); }}
                className="relative btn-ghost p-2.5"
                aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-12 w-80 card shadow-elevated animate-slide-down overflow-hidden z-50">
                  <div className="p-4 border-b border-surface-100 flex justify-between items-center">
                    <h3 className="font-bold text-sm">Notifications</h3>
                    <button onClick={markAllRead} className="text-xs text-primary-600 font-medium hover:underline">Mark all read</button>
                  </div>
                  <div className="divide-y divide-surface-100 max-h-80 overflow-y-auto scrollbar-thin">
                    {notifications.length === 0 ? (
                      <p className="text-center text-sm text-text-muted py-8">No notifications yet</p>
                    ) : notifications.slice(0, 6).map(n => (
                      <div key={n.id} className={cn('p-4 hover:bg-surface-50 transition-colors cursor-pointer', !n.read && 'bg-primary-50/50')}>
                        <p className="text-sm font-semibold text-text-primary">{n.title}</p>
                        <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(o => !o)}
                className="flex items-center gap-2 hover:bg-surface-100 rounded-xl px-2 py-1.5 transition-colors"
                aria-label="Profile menu"
                aria-expanded={profileOpen}
              >
                <Avatar src={user.avatar} name={user.name} size="sm" />
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-text-primary leading-tight">{user.name.split(' ')[0]}</p>
                  <p className="text-[10px] text-text-muted capitalize">{user.role}</p>
                </div>
                <ChevronDown size={14} className={cn('text-text-muted transition-transform', profileOpen && 'rotate-180')} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-60 card shadow-elevated animate-slide-down overflow-hidden z-50">
                  <div className="p-4 border-b border-surface-100 bg-gradient-to-r from-primary-50 to-purple-50">
                    <p className="font-bold text-sm text-text-primary">{user.name}</p>
                    <p className="text-xs text-text-secondary">{user.email}</p>
                    <Badge variant="primary" size="sm" className="mt-1 capitalize">{user.role}</Badge>
                  </div>

                  {/* Quick role switcher */}
                  <div className="p-2 border-b border-surface-100">
                    <p className="text-[10px] text-text-muted px-2 mb-1 font-semibold uppercase tracking-wide">Demo Roles</p>
                    {(['student', 'instructor', 'admin'] as UserRole[]).map(r => (
                      <button key={r} onClick={() => { switchRole(r); setProfileOpen(false); navigate(r === 'student' ? '/dashboard' : r === 'instructor' ? '/instructor/dashboard' : '/admin/dashboard'); }}
                        className={cn('w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors', role === r ? 'bg-primary-100 text-primary-700' : 'hover:bg-surface-100 text-text-secondary')}>
                        {r === 'student' ? '🎓' : r === 'instructor' ? '👨‍🏫' : '⚙️'} {r}
                      </button>
                    ))}
                  </div>

                  <div className="p-2">
                    <Link to={role === 'student' ? '/profile' : role === 'instructor' ? '/instructor/profile' : '/admin/settings'}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface-100 transition-colors">
                      <User size={14} /> Profile
                    </Link>
                    <Link to={role === 'student' ? '/settings' : '/admin/settings'}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface-100 transition-colors">
                      <Settings size={14} /> Settings
                    </Link>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-error-500 hover:bg-error-50 transition-colors mt-1">
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="hidden sm:flex items-center gap-2">
            <Link to="/login" className="btn-ghost text-sm px-4 py-2">Log in</Link>
            <Link to="/register" className="btn-primary text-sm px-4 py-2.5">Sign up free</Link>
          </div>
        )}

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="lg:hidden btn-ghost p-2"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-surface-200 animate-slide-down">
          <div className="px-4 py-3">
            <form onSubmit={handleSearch} className="flex items-center relative mb-4">
              <Search size={16} className="absolute left-3 text-text-muted" />
              <input type="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search courses…"
                className="input-base pl-9 text-sm" aria-label="Search courses" />
            </form>
            <nav className="flex flex-col gap-1">
              {isAuthenticated ? links.map(link => (
                <Link key={link.to} to={link.to}
                  className={cn('nav-link text-base py-2.5', isActive(link.to) && 'nav-link-active')}>
                  {link.icon} {link.label}
                </Link>
              )) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Link to="/login" className="btn-secondary text-center">Log in</Link>
                  <Link to="/register" className="btn-primary text-center">Sign up free</Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
