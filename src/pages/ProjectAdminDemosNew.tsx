
import React from 'react';
import DemoManager from '@/components/DemoManager';

export default function ProjectAdminDemosNew() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Manage Business Demos</h2>
        <p className="text-muted-foreground">
          Create and manage demos visible to all clients
        </p>
      </div>
      
      <DemoManager isAdminView={true} />
    </div>
  );
}
