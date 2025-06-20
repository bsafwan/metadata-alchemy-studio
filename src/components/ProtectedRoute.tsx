
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ProjectSelector from './ProjectSelector';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireProject?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireProject = false }) => {
  const { user, loading } = useAuth();
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [userProjects, setUserProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    if (user && requireProject) {
      checkUserProjects();
    } else {
      setProjectsLoading(false);
    }
  }, [user, requireProject]);

  const checkUserProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user!.id)
        .eq('is_active', true);

      if (error) throw error;

      setUserProjects(data || []);
      
      // Check if user has completed initial setup
      if (data && data.length > 0) {
        // Update user's initial setup status if not already done
        await supabase
          .from('users')
          .update({ has_completed_initial_setup: true })
          .eq('id', user!.id);

        // Check for selected project
        const savedProjectId = localStorage.getItem('selected_project_id');
        if (savedProjectId && data.some(p => p.id === savedProjectId)) {
          setSelectedProject(savedProjectId);
        } else if (data.length === 1) {
          // Auto-select if only one project
          setSelectedProject(data[0].id);
          localStorage.setItem('selected_project_id', data[0].id);
        }
      }
    } catch (error) {
      console.error('Error checking projects:', error);
    } finally {
      setProjectsLoading(false);
    }
  };

  const handleProjectSelected = (projectId: string) => {
    setSelectedProject(projectId);
  };

  if (loading || projectsLoading) {
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
    // If no projects exist, redirect to project setup
    if (userProjects.length === 0) {
      return <Navigate to="/project-setup" replace />;
    }

    // If multiple projects but none selected, show selector
    if (userProjects.length > 1 && !selectedProject) {
      return <ProjectSelector onProjectSelected={handleProjectSelected} />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
