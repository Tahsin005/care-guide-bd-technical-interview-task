import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuthStore } from '../../store/authStore';
import { NotefulIcon } from './NotefulLogo';

export function LoadingScreen() {
  return (
    <div className="min-h-screen w-full bg-[#f4f6f8] flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-4">
        <NotefulIcon className="w-26 h-26 animate-pulse" />
      </div>
    </div>
  );
}

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}

export function AdminRoute({ children }) {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/notes" replace />;
  }

  return children ? children : <Outlet />;
}

export function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/notes" replace />;
  }

  return children ? children : <Outlet />;
}

