
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ProjectProgressionManagerProps {
  projectId: string;
  currentProgression: number;
  totalAmount: number;
  onProgressionUpdate: () => void;
}

export default function ProjectProgressionManager({ 
  projectId, 
  currentProgression, 
  totalAmount,
  onProgressionUpdate 
}: ProjectProgressionManagerProps) {
  const [loading, setLoading] = useState(false);

  const updateProgression = async (newPercentage: number) => {
    if (newPercentage < 0 || newPercentage > 100) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('projects')
        .update({ progression_percentage: newPercentage })
        .eq('id', projectId);

      if (error) throw error;
      
      toast.success(`Project progression updated to ${newPercentage}%`);
      onProgressionUpdate();
    } catch (error) {
      console.error('Error updating progression:', error);
      toast.error('Failed to update project progression');
    } finally {
      setLoading(false);
    }
  };

  const adjustProgression = (increment: number) => {
    const newPercentage = Math.max(0, Math.min(100, currentProgression + increment));
    updateProgression(newPercentage);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Project Progression
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Current Progress</span>
          <Badge variant={currentProgression >= 50 ? 'default' : 'secondary'}>
            {currentProgression}%
          </Badge>
        </div>
        
        <Progress value={currentProgression} className="mb-4" />
        
        <div className="flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => adjustProgression(-5)}
            disabled={loading || currentProgression <= 0}
          >
            <Minus className="w-4 h-4" />
            5%
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => adjustProgression(-1)}
            disabled={loading || currentProgression <= 0}
          >
            <Minus className="w-4 h-4" />
            1%
          </Button>
          
          <span className="mx-4 text-lg font-bold">{currentProgression}%</span>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => adjustProgression(1)}
            disabled={loading || currentProgression >= 100}
          >
            <Plus className="w-4 h-4" />
            1%
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => adjustProgression(5)}
            disabled={loading || currentProgression >= 100}
          >
            <Plus className="w-4 h-4" />
            5%
          </Button>
        </div>

        {currentProgression >= 50 && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              🎉 Automatic 50% payment initialized for ${(totalAmount * 0.5).toFixed(2)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
