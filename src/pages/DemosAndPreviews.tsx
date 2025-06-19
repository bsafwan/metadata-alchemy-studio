
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Eye, Download } from 'lucide-react';

export default function DemosAndPreviews() {
  const demos = [
    { name: 'Homepage Design', views: 24, type: 'Web', date: '2 days ago' },
    { name: 'Mobile Interface', views: 18, type: 'Mobile', date: '4 days ago' },
    { name: 'Dashboard Layout', views: 32, type: 'Web', date: '1 week ago' },
    { name: 'Logo Concepts', views: 15, type: 'Branding', date: '1 week ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Demos & Previews</h2>
        <Badge variant="outline">4 Available</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {demos.map((demo, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-elismet-orange rounded-lg flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{demo.name}</CardTitle>
                    <CardDescription>{demo.date}</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">{demo.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Eye className="w-4 h-4" />
                  {demo.views} views
                </div>
                <div className="flex items-center gap-1 text-elismet-blue cursor-pointer hover:underline">
                  <Download className="w-4 h-4" />
                  Download
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
