import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import type { UserRole } from '../../types';

export function LoginPage() {
  const { login: authLogin } = useAuth();
  const { login: appLogin, addToast } = useApp();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('alex.johnson@example.com');
  const [password, setPassword] = useState('password123');

  const presetCredentials: Record<UserRole, { email: string; name: string }> = {
    student: { email: 'alex.johnson@example.com', name: 'Alex Johnson (Student)' },
    instructor: { email: 'sarah@learnsphere.com', name: 'Dr. Sarah Mitchell (Instructor)' },
    admin: { email: 'admin@learnsphere.com', name: 'System Administrator (Admin)' },
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(presetCredentials[role].email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('error', 'Missing fields', 'Please provide email and password.');
      return;
    }

    await authLogin(email, password, selectedRole);
    appLogin(email, password, selectedRole);
    const destination = selectedRole === 'student' ? '/dashboard' : selectedRole === 'instructor' ? '/instructor/dashboard' : '/admin/dashboard';
    navigate(destination);
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <div className="card p-6 sm:p-8 shadow-elevated bg-white space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-purple-600 mx-auto flex items-center justify-center text-white shadow-primary">
            <GraduationCap size={24} />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Welcome Back</h1>
          <p className="text-xs text-text-secondary">Select your demo role to log into LearnSphere</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-surface-100 p-1 rounded-xl grid grid-cols-3 gap-1">
          {(['student', 'instructor', 'admin'] as UserRole[]).map(role => (
            <button
              key={role}
              type="button"
              onClick={() => handleRoleSelect(role)}
              className={`py-2 text-xs font-bold capitalize rounded-lg transition-all ${
                selectedRole === role
                  ? 'bg-white text-primary-600 shadow-soft'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Quick Demo Credentials Info */}
        <div className="p-3 bg-primary-50 rounded-xl border border-primary-100 flex items-center justify-between text-xs">
          <div>
            <p className="font-bold text-primary-900">Demo Mode Active</p>
            <p className="text-primary-700 text-[11px]">{presetCredentials[selectedRole].name}</p>
          </div>
          <Badge variant="primary" size="sm">Pre-filled</Badge>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-primary">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-text-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-surface-50 border border-surface-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-text-primary">Password</label>
              <span className="text-xs text-primary-600 hover:underline cursor-pointer">Forgot password?</span>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-text-muted" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-surface-50 border border-surface-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button type="submit" fullWidth size="lg" leftIcon={<LogIn size={18} />}>
            Sign In as {selectedRole}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-text-secondary pt-2 border-t border-surface-100">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 font-bold hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
