import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { createInspectionForm } from '@/api/inspections';
import { useToast } from '@/hooks/useToast';
import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface ChecklistItem {
  name: string;
  type: string;
  required: boolean;
  helpText: string;
}

interface TrainingResource {
  title: string;
  url: string;
  type: string;
  description: string;
}

interface InspectionFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export function InspectionFormModal({ open, onOpenChange, onClose }: InspectionFormModalProps) {
  const { toast } = useToast();
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      name: '',
      description: '',
      status: 'Active',
    },
  });

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [trainingResources, setTrainingResources] = useState<TrainingResource[]>([]);

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      await createInspectionForm({
        name: String(data.name),
        description: String(data.description),
        status: String(data.status),
        checklistItems,
        trainingResources,
        assignedVehicles: [],
        assignedDrivers: [],
      });
      toast({
        title: 'Success',
        description: 'Inspection form created successfully',
      });
      reset();
      setChecklistItems([]);
      setTrainingResources([]);
      onClose();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create form';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Inspection Form</DialogTitle>
          <DialogDescription>
            Create a new inspection form with checklist items
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Form Name</Label>
            <Input id="name" {...register('name', { required: true })} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description')} />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Form
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}