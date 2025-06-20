
import { useSuperAdmin } from '@/contexts/SuperAdminContext';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface SuperAdminProtectedRouteProps {
  children: React.ReactNode;
}

const SuperAdminProtectedRoute: React.FC<SuperAdminProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useSuperAdmin();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/system-control-panel-auth-gateway-x7k9m2p8q4w1" replace />;
  }

  return <>{children}</>;
};

export default SuperAdminProtectedRoute;
