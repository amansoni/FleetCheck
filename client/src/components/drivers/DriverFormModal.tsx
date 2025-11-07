import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { createDriver, updateDriver } from '@/api/drivers';
import { useToast } from '@/hooks/useToast';

interface Driver {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  employmentStatus: string;
  hireDate: string;
  licenseNumber: string;
  licenseExpiryDate: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

interface DriverFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  driver?: Driver;
  onClose: () => void;
}

export function DriverFormModal({ open, onOpenChange, driver, onClose }: DriverFormModalProps) {
  const { toast } = useToast();
  const { register, handleSubmit, reset, watch } = useForm<Driver>({
    defaultValues: driver || {
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      employmentStatus: 'Active',
      hireDate: '',
      licenseNumber: '',
      licenseExpiryDate: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
    },
  });

  const onSubmit = async (data: Driver) => {
    try {
      if (driver) {
        await updateDriver(driver._id, data);
        toast({
          title: 'Success',
          description: 'Driver updated successfully',
        });
      } else {
        await createDriver(data);
        toast({
          title: 'Success',
          description: 'Driver created successfully',
        });
      }
      reset();
      onClose();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save driver';
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
          <DialogTitle>{driver ? 'Edit Driver' : 'Add New Driver'}</DialogTitle>
          <DialogDescription>
            {driver ? 'Update driver information' : 'Create a new driver profile'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register('firstName', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register('lastName', { required: true })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register('phone', { required: true })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employmentStatus">Employment Status</Label>
              <Select defaultValue={watch('employmentStatus')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hireDate">Hire Date</Label>
              <Input id="hireDate" type="date" {...register('hireDate', { required: true })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input id="licenseNumber" {...register('licenseNumber', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseExpiryDate">License Expiry Date</Label>
              <Input id="licenseExpiryDate" type="date" {...register('licenseExpiryDate', { required: true })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
              <Input id="emergencyContactName" {...register('emergencyContactName', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
              <Input id="emergencyContactPhone" {...register('emergencyContactPhone', { required: true })} />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {driver ? 'Update' : 'Create'} Driver
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}