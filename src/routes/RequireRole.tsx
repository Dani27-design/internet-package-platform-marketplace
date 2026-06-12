import { Navigate, Outlet, useLocation } from 'react-router-dom';
import type { UserRole } from '../domain/types';
import { useAuth } from '../auth/AuthProvider';

type RequireRoleProps = {
  role: UserRole;
};

export function RequireRole({ role }: RequireRoleProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
