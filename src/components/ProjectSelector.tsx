
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Calendar, ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  project_name: string;
  status: string;
  created_at: string;
}

interface ProjectSelectorProps {
  projects: Project[];
  onProjectSelected: (projectId: string) => void;
}

const ProjectSelector = ({ projects, onProjectSelected }: ProjectSelectorProps) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId);
    onProjectSelected(projectId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center">
            <FolderOpen className="w-6 h-6 mr-2" />
            Select Your Project
          </CardTitle>
          <CardDescription>
            Choose which project you'd like to work on
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectSelector;
