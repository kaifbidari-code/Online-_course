import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    // Redirect to default home/dashboard based on role
    const fallback = role === 'student' ? '/dashboard' : role === 'instructor' ? '/instructor/dashboard' : '/admin/dashboard';
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}
