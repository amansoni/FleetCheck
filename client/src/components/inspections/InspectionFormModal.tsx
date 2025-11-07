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

  const [checklistItems, setChecklistItems] = useState<any[]>([]);
  const [trainingResources, setTrainingResources] = useState<any[]>([]);

  const onSubmit = async (data: any) => {
    try {
      await createInspectionForm({
        ...data,
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
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create form',
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