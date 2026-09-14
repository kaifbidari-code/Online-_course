import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import Button from '../../components/ui/Button';
import type { UserRole } from '../../types';

export function RegisterPage() {
  const { login: authLogin } = useAuth();
  const { login: appLogin, addToast } = useApp();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      addToast('error', 'Please fill in all fields');
      return;
    }

    addToast('success', 'Account created successfully!', `Welcome to LearnSphere as a ${role}`);
    const dest = role === 'student' ? '/dashboard' : role === 'instructor' ? '/instructor/dashboard' : '/admin/dashboard';
    await authLogin(email || 'alex.johnson@example.com', password, role);
    appLogin(email || 'alex.johnson@example.com', password, role);
    navigate(dest);
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <div className="card p-6 sm:p-8 shadow-elevated bg-white space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-600 to-purple-600 mx-auto flex items-center justify-center text-white shadow-primary">
            <GraduationCap size={24} />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Create Your Account</h1>
          <p className="text-xs text-text-secondary">Join over 50,000+ students and instructors on LearnSphere</p>
        </div>

        {/* Role Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-text-primary">I want to join as:</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`p-3 rounded-xl border text-left transition-all ${
                role === 'student'
                  ? 'border-primary-600 bg-primary-50 text-primary-700 font-bold'
                  : 'border-surface-200 hover:border-surface-300 text-text-secondary'
              }`}
            >
              <p className="text-sm">🎓 Student</p>
              <p className="text-[10px] opacity-75">Learn skills & earn certs</p>
            </button>

            <button
              type="button"
              onClick={() => setRole('instructor')}
              className={`p-3 rounded-xl border text-left transition-all ${
                role === 'instructor'
                  ? 'border-primary-600 bg-primary-50 text-primary-700 font-bold'
                  : 'border-surface-200 hover:border-surface-300 text-text-secondary'
              }`}
            >
              <p className="text-sm">👨‍🏫 Instructor</p>
              <p className="text-[10px] opacity-75">Publish & sell courses</p>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-text-primary">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-3 text-text-muted" />
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-surface-50 border border-surface-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
                placeholder="Jane Doe"
              />
            </div>
          </div>

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
            <label className="text-xs font-bold text-text-primary">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-3 text-text-muted" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-surface-50 border border-surface-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
                placeholder="At least 8 characters"
              />
            </div>
          </div>

          <Button type="submit" fullWidth size="lg" leftIcon={<UserPlus size={18} />}>
            Create Free Account
          </Button>
        </form>

        <p className="text-center text-xs text-text-secondary pt-2 border-t border-surface-100">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
