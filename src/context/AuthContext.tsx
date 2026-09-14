import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, UserRole } from '../types';
import { mockStudents, mockInstructors, mockAdmin } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ACCOUNTS: Record<UserRole, User> = {
  student: mockStudents[0],
  instructor: mockInstructors[0],
  admin: mockAdmin,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('learnsphere_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem('learnsphere_user'); }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string, role: UserRole) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    // Find matching user by email or use demo account for role
    const allUsers = [...mockStudents, ...mockInstructors, mockAdmin];
    const found = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role)
      || DEMO_ACCOUNTS[role];
    setUser(found);
    localStorage.setItem('learnsphere_user', JSON.stringify(found));
    setIsLoading(false);
    return { success: true };
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string, role: UserRole) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const newUser: User = {
      id: `user-${Date.now()}`, name, email, role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      joinedAt: new Date().toISOString(), isActive: true,
      enrolledCourses: [], completedCourses: [], wishlist: [], certificates: [],
      totalLearningHours: 0, streak: 0,
    };
    setUser(newUser);
    localStorage.setItem('learnsphere_user', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('learnsphere_user');
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem('learnsphere_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    const demo = DEMO_ACCOUNTS[role];
    setUser(demo);
    localStorage.setItem('learnsphere_user', JSON.stringify(demo));
  }, []);

  return (
    <AuthContext.Provider value={{
      user, role: user?.role ?? null, isAuthenticated: !!user,
      isLoading, login, register, logout, updateUser, switchRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
