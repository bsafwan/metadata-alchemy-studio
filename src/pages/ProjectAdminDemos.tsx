
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Monitor, Upload, Eye, Download } from 'lucide-react';

export default function ProjectAdminDemos() {
  const demos = [
    {
      id: 1,
      name: 'Homepage Design V2',
      type: 'Design',
      status: 'Ready',
      uploadDate: '2024-12-15',
      views: 12,
      feedback: 'pending'
    },
    {
      id: 2,
      name: 'Mobile App Prototype',
      type: 'Interactive',
      status: 'In Review',
      uploadDate: '2024-12-14',
      views: 8,
      feedback: 'approved'
    },
    {
      id: 3,
      name: 'User Flow Demo',
      type: 'Video',
      status: 'Draft',
      uploadDate: '2024-12-13',
      views: 3,
      feedback: 'needs changes'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'default';
      case 'In Review': return 'secondary';
      case 'Draft': return 'outline';
      default: return 'destructive';
    }
  };

  const getFeedbackColor = (feedback: string) => {
    switch (feedback) {
      case 'approved': return 'default';
      case 'pending': return 'secondary';
      case 'needs changes': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Demos & Previews</h2>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Demo
        </Button>
      </div>

      <div className="grid gap-6">
        {demos.map((demo) => (
          <Card key={demo.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Monitor className="w-8 h-8 text-green-500" />
                  <div>
                    <CardTitle className="text-lg">{demo.name}</CardTitle>
                    <CardDescription>Type: {demo.type} • Uploaded: {demo.uploadDate}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(demo.status)}>
                    {demo.status}
                  </Badge>
                  <Badge variant={getFeedbackColor(demo.feedback)}>
                    {demo.feedback}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {demo.views} views
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
