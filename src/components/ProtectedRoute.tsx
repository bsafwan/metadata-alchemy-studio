
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
  const [hasCompletedInitialSetup, setHasCompletedInitialSetup] = useState(false);

  useEffect(() => {
    if (user && requireProject) {
      checkUserProjects();
    } else {
      setProjectsLoading(false);
    }
  }, [user, requireProject]);

  const checkUserProjects = async () => {
    try {
      // Check user's setup status
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('has_completed_initial_setup')
        .eq('id', user!.id)
        .single();

      if (userError) throw userError;

      setHasCompletedInitialSetup(userData.has_completed_initial_setup);

      // Get user's projects
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user!.id)
        .eq('is_active', true);

      if (error) throw error;

      setUserProjects(data || []);
      
      // Handle project selection
      if (data && data.length > 0) {
        const savedProjectId = localStorage.getItem('selected_project_id');
        
        // Check if saved project exists and belongs to user
        if (savedProjectId && data.some(p => p.id === savedProjectId)) {
          setSelectedProject(savedProjectId);
        } else if (data.length === 1) {
          // Auto-select if only one project
          setSelectedProject(data[0].id);
          localStorage.setItem('selected_project_id', data[0].id);
        }
        // If multiple projects and no valid selection, user will see selector
      }
    } catch (error) {
      console.error('Error checking projects:', error);
    } finally {
      setProjectsLoading(false);
    }
  };

  const handleProjectSelected = (projectId: string) => {
    setSelectedProject(projectId);
    localStorage.setItem('selected_project_id', projectId);
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
    // If user hasn't completed initial setup AND has no projects, redirect to setup
    if (!hasCompletedInitialSetup && userProjects.length === 0) {
      return <Navigate to="/project-setup" replace />;
    }

    // If user has no projects but has completed setup, they can create more from account page
    if (userProjects.length === 0) {
      return <Navigate to="/account" replace />;
    }

    // If multiple projects but none selected, show selector
    if (userProjects.length > 1 && !selectedProject) {
      return <ProjectSelector projects={userProjects} onProjectSelected={handleProjectSelected} />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
