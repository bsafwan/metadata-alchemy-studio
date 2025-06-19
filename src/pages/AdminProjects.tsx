
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { FolderKanban, Calendar, DollarSign, User, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminProjects() {
  const projects = [
    { 
      id: '1',
      name: 'E-commerce Platform', 
      client: 'Tech Solutions Inc',
      progress: 85, 
      status: 'In Progress', 
      budget: 15000,
      deadline: 'Dec 30',
      team: 4
    },
    { 
      id: '2',
      name: 'Brand Website', 
      client: 'Creative Design Co',
      progress: 60, 
      status: 'Active', 
      budget: 8000,
      deadline: 'Jan 15',
      team: 2
    },
    { 
      id: '3',
      name: 'Mobile App', 
      client: 'StartUp Hub',
      progress: 95, 
      status: 'Review', 
      budget: 25000,
      deadline: 'Nov 25',
      team: 6
    },
    { 
      id: '4',
      name: 'Marketing Campaign', 
      client: 'Marketing Pro',
      progress: 30, 
      status: 'Paused', 
      budget: 5000,
      deadline: 'Feb 10',
      team: 3
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'default';
      case 'Active': return 'secondary';
      case 'Review': return 'outline';
      case 'Paused': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">All Projects</h2>
        <Badge variant="outline">312 Total Projects</Badge>
      </div>

      <div className="grid gap-6">
        {projects.map((project, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-elismet-orange rounded-lg flex items-center justify-center">
                    <FolderKanban className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>Client: {project.client}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Button size="sm" asChild>
                    <Link to={`/admin/project/${project.id}`}>
                      <Settings className="w-4 h-4 mr-2" />
                      Manage
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  ${project.budget.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Due {project.deadline}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {project.team} members
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
