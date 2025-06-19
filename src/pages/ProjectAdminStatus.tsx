
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Activity, CheckCircle, Clock, AlertTriangle, Edit } from 'lucide-react';

export default function ProjectAdminStatus() {
  const projectStatus = {
    overallProgress: 75,
    currentPhase: 'Development',
    nextMilestone: 'Beta Testing',
    estimatedCompletion: '2024-12-30'
  };

  const phases = [
    {
      name: 'Planning',
      progress: 100,
      status: 'Completed',
      startDate: '2024-10-01',
      endDate: '2024-10-15'
    },
    {
      name: 'Design',
      progress: 100,
      status: 'Completed',
      startDate: '2024-10-16',
      endDate: '2024-11-05'
    },
    {
      name: 'Development',
      progress: 75,
      status: 'In Progress',
      startDate: '2024-11-06',
      endDate: '2024-12-15'
    },
    {
      name: 'Testing',
      progress: 0,
      status: 'Pending',
      startDate: '2024-12-16',
      endDate: '2024-12-25'
    },
    {
      name: 'Deployment',
      progress: 0,
      status: 'Pending',
      startDate: '2024-12-26',
      endDate: '2024-12-30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'In Progress': return 'secondary';
      case 'Pending': return 'outline';
      case 'Delayed': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return CheckCircle;
      case 'In Progress': return Activity;
      case 'Pending': return Clock;
      case 'Delayed': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Status</h2>
        <Button>
          <Edit className="w-4 h-4 mr-2" />
          Update Status
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStatus.overallProgress}%</div>
            <Progress value={projectStatus.overallProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Phase</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStatus.currentPhase}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStatus.nextMilestone}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Completion</CardTitle>
            <AlertTriangle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStatus.estimatedCompletion}</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Project Phases</h3>
        {phases.map((phase, index) => {
          const StatusIcon = getStatusIcon(phase.status);
          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <StatusIcon className="w-6 h-6 text-blue-500" />
                    <div>
                      <CardTitle className="text-lg">{phase.name}</CardTitle>
                      <CardDescription>
                        {phase.startDate} - {phase.endDate}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(phase.status)}>
                    {phase.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{phase.progress}%</span>
                  </div>
                  <Progress value={phase.progress} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
