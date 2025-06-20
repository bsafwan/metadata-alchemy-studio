
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireProject?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireProject = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireProject) {
    // Check if user has completed project setup
    const hasProject = localStorage.getItem('user_project_created');
    if (!hasProject) {
      return <Navigate to="/project-setup" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
