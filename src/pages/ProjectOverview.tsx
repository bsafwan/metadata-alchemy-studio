
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Target } from 'lucide-react';

export default function ProjectOverview() {
  const projects = [
    { name: 'Website Redesign', progress: 85, status: 'In Progress', team: 4, deadline: 'Dec 15' },
    { name: 'Mobile App', progress: 60, status: 'Active', team: 3, deadline: 'Jan 20' },
    { name: 'Brand Identity', progress: 95, status: 'Review', team: 2, deadline: 'Nov 30' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Badge variant="outline">3 Active</Badge>
      </div>

      <div className="grid gap-6">
        {projects.map((project, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription>Project in development</CardDescription>
                </div>
                <Badge variant={project.status === 'Review' ? 'secondary' : 'default'}>
                  {project.status}
                </Badge>
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
              
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {project.team} members
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Due {project.deadline}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
