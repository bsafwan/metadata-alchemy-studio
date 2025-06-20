
import React from 'react';
import { useParams } from 'react-router-dom';
import PhasePaymentManager from '@/components/PhasePaymentManager';

export default function ProjectAdminPayments() {
  const { projectId } = useParams();

  if (!projectId) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Project ID is required</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Payment Management</h2>
        <p className="text-muted-foreground">
          Manage project payments and approvals
        </p>
      </div>
      
      <PhasePaymentManager projectId={projectId} isAdminView={true} />
    </div>
  );
}
