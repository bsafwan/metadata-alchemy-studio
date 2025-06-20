
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, User, Building2, Mail, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Project {
  id: string;
  project_name: string;
  status: string;
  created_at: string;
  is_active: boolean;
}

const Account = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProjects();
    }
  }, [user]);

  const fetchUserProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSelect = (projectId: string) => {
    localStorage.setItem('selected_project_id', projectId);
    navigate('/dashboard');
  };

  const handleCreateNewProject = () => {
    navigate('/project-setup');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* User Info Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-500">Name:</span>
                    <span className="ml-2 font-medium">{user.first_name} {user.last_name}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-500">Email:</span>
                    <span className="ml-2 font-medium">{user.email}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-500">Business:</span>
                    <span className="ml-2 font-medium">{user.business_name}</span>
                  </div>
                  <div className="flex items-center">
                    <Settings className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-sm text-gray-500">Category:</span>
                    <span className="ml-2 font-medium">{user.business_category}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Projects Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Projects</CardTitle>
                  <CardDescription>
                    Manage your CRM projects and create new ones
                  </CardDescription>
                </div>
                <Button onClick={handleCreateNewProject} className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Loading projects...</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't created any projects yet.</p>
                  <Button onClick={handleCreateNewProject}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Project
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleProjectSelect(project.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{project.project_name}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getStatusColor(project.status)}>
                              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </Badge>
                            <span className="text-sm text-gray-500 flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              Created {new Date(project.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Open Dashboard
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
